/**
 * Reference tables.
 *
 * Each table states the document it comes from and carries the requirement to
 * verify against the adopted edition. Code tables are revised between editions
 * and adopted differently by jurisdiction, so the copy in front of the reader
 * governs, never this site.
 */

import {
  ADJUSTMENT_FACTORS,
  AMPACITY_310_16,
  AWG_SIZES,
  DATA_TYPES,
  EMT_AREA,
  MOTOR_FLC_3PH,
  STANDARD_OCPD,
  TEMP_CORRECTION,
} from './reference-data';

export type RefTableCategory =
  | 'Electrical'
  | 'Control Panels'
  | 'Instrumentation'
  | 'PLC & Data'
  | 'Conversions';

export type RefTable = {
  slug: string;
  title: string;
  category: RefTableCategory;
  summary: string;
  answer: string;
  /** The document these values come from, stated plainly. */
  basis: string;
  head: string[];
  rows: string[][];
  notes: string[];
  keywords?: string[];
  related?: string[];
  relatedCalculators?: string[];
};

const dash = (value: number | null | undefined) => (value === null || value === undefined ? '—' : String(value));

const ampacityRows = AWG_SIZES.map((size) => {
  const cu = AMPACITY_310_16.copper[size.label];
  const al = AMPACITY_310_16.aluminum[size.label];
  return [
    size.label,
    dash(cu?.[0]),
    dash(cu?.[1]),
    dash(cu?.[2]),
    dash(al?.[0]),
    dash(al?.[1]),
    dash(al?.[2]),
  ];
});

const correctionRows = TEMP_CORRECTION.map((row, index) => {
  const previous = index === 0 ? null : TEMP_CORRECTION[index - 1]![0];
  const range = previous === null ? `${row[0]} or less` : `${previous + 1} to ${row[0]}`;
  const f = (celsius: number) => Math.round(celsius * 1.8 + 32);
  const fahrenheit =
    previous === null ? `${f(row[0])} or less` : `${f(previous) + 1} to ${f(row[0])}`;
  return [range, fahrenheit, dash(row[1]), dash(row[2]), String(row[3])];
});

const motorRows = Object.entries(MOTOR_FLC_3PH).map(([hp, amps]) => [
  hp,
  ...amps.map((a) => String(a)),
]);

export const REFERENCE_TABLES: RefTable[] = [
  {
    slug: 'conductor-ampacity',
    title: 'Conductor Ampacity Table',
    category: 'Electrical',
    summary:
      'Allowable ampacity for copper and aluminum conductors at the 60, 75, and 90 degree C columns, for not more than three current-carrying conductors at 30 degrees C ambient.',
    answer:
      'Allowable conductor ampacity depends on size, material, and insulation temperature rating. At the 75 degree C column, copper carries 25 amperes at 12 AWG, 35 at 10 AWG, 50 at 8 AWG, and 65 at 6 AWG. These figures assume not more than three current-carrying conductors in a raceway at a 30 degree C ambient, and correction and adjustment factors apply on top of them.',
    basis:
      'Values as commonly published for NFPA 70 (National Electrical Code) Table 310.16. Reproduced for convenience. Verify against the edition adopted in your jurisdiction.',
    keywords: ['ampacity', 'wire table', '310.16', 'THHN', 'copper', 'aluminum'],
    head: ['Size', 'Cu 60 C', 'Cu 75 C', 'Cu 90 C', 'Al 60 C', 'Al 75 C', 'Al 90 C'],
    rows: ampacityRows,
    notes: [
      'Based on not more than three current-carrying conductors in a raceway, cable, or earth, at an ambient of 30 degrees C.',
      'The ambient correction factor and the adjustment factor for more than three current-carrying conductors both apply on top of these figures.',
      'The 90 degree C column is normally used only as a starting point for derating. Per 110.14(C), the finished ampacity cannot exceed the column matching the lowest-rated termination, which is commonly 60 or 75 degrees C.',
      '240.4(D) separately limits the overcurrent device for small conductors: 15 A for 14 AWG copper, 20 A for 12 AWG copper, and 30 A for 10 AWG copper, with limited exceptions.',
      'This is the table for the general case. Other installation methods, such as conductors in free air, use different tables.',
    ],
    related: ['/controls/control-panels/panel-design/nfpa-70'],
    relatedCalculators: ['conductor-ampacity', 'voltage-drop', 'wire-size-for-voltage-drop'],
  },
  {
    slug: 'temperature-correction-factors',
    title: 'Ambient Temperature Correction Factors',
    category: 'Electrical',
    summary:
      'Multipliers applied to conductor ampacity when the ambient temperature differs from 30 degrees C, by insulation temperature rating.',
    answer:
      'Conductor ampacity tables assume a 30 degree C ambient. Above that, ampacity is reduced by a correction factor: a 75 degree C conductor is multiplied by 0.94 between 31 and 35 degrees C, and by 0.82 between 41 and 45 degrees C. Below 30 degrees C the factors are greater than one.',
    basis:
      'Values as commonly published for NFPA 70 Table 310.15(B)(1), based on 30 degrees C. Verify against your adopted edition.',
    keywords: ['temperature correction', 'derating', 'ambient', '310.15'],
    head: ['Ambient C', 'Ambient F', '60 C rated', '75 C rated', '90 C rated'],
    rows: correctionRows,
    notes: [
      'A dash means the conductor is not usable at that ambient temperature and a higher insulation rating is required.',
      'The ambient to use is the temperature the conductor actually sees, which inside a sealed enclosure in the sun is well above the outdoor temperature.',
      'This factor and the adjustment factor for conductor count both apply, multiplied together.',
    ],
    relatedCalculators: ['conductor-ampacity'],
  },
  {
    slug: 'conductor-adjustment-factors',
    title: 'Adjustment Factors for Conductor Count',
    category: 'Electrical',
    summary:
      'Ampacity multipliers applied when more than three current-carrying conductors share a raceway or cable.',
    answer:
      'When more than three current-carrying conductors share a raceway or cable, mutual heating reduces the ampacity of each. Four to six conductors are multiplied by 80%, seven to nine by 70%, ten to twenty by 50%, and the factor continues to fall as the count rises.',
    basis:
      'Values as commonly published for NFPA 70 Table 310.15(C)(1). Verify against your adopted edition.',
    keywords: ['adjustment factor', 'conduit fill', 'derating', 'current carrying conductors'],
    head: ['Current-carrying conductors', 'Adjustment factor', 'Percent'],
    rows: [
      ['1 to 3', '1.00', '100%'],
      ...ADJUSTMENT_FACTORS.map((row) => [
        row.max === Number.POSITIVE_INFINITY ? `${row.min} and above` : `${row.min} to ${row.max}`,
        row.factor.toFixed(2),
        `${row.factor * 100}%`,
      ]),
    ],
    notes: [
      'Ungrounded conductors always count. Equipment grounding conductors do not.',
      'A neutral carrying only the unbalanced current of a multiwire branch circuit generally does not count, but a neutral in a system with significant harmonic content does.',
      'This factor and the ambient temperature correction factor both apply, multiplied together.',
    ],
    relatedCalculators: ['conductor-ampacity', 'conduit-fill'],
  },
  {
    slug: 'wire-gauge-table',
    title: 'Wire Gauge, Circular Mils, and Area',
    category: 'Electrical',
    summary:
      'Circular mil area and approximate insulated cross-sectional area for AWG and kcmil conductor sizes.',
    answer:
      'Circular mils express conductor cross-sectional area and are the basis of the voltage drop formula. A 12 AWG conductor is 6,530 circular mils, 4/0 AWG is 211,600, and one kcmil is 1,000 circular mils. Each three AWG sizes roughly doubles the area.',
    basis:
      'Circular mil values are the standard AWG geometric definitions. Insulated areas are the approximate values commonly published for THHN and THWN-2 in NFPA 70 Chapter 9 Table 5.',
    keywords: ['wire table', 'AWG', 'circular mils', 'kcmil', 'conductor area'],
    head: ['Size', 'Circular mils', 'THHN area, sq in', 'Relative area'],
    rows: AWG_SIZES.map((size) => [
      size.label,
      size.cmil.toLocaleString('en-US'),
      size.thhnArea.toFixed(4),
      `${(size.cmil / 6530).toFixed(1)}x of 12 AWG`,
    ]),
    notes: [
      'Insulated areas are for THHN and THWN-2. Other insulation types have different areas, and using the wrong one changes a conduit fill result.',
      'Circular mils are used directly in the voltage drop formula. Doubling the circular mils halves the voltage drop at the same current and distance.',
    ],
    relatedCalculators: ['voltage-drop', 'conduit-fill', 'wire-size-for-voltage-drop'],
  },
  {
    slug: 'motor-full-load-current',
    title: 'Three-Phase Motor Full-Load Current',
    category: 'Electrical',
    summary:
      'Full-load current for three-phase induction motors by horsepower and voltage, used for sizing conductors and overcurrent devices.',
    answer:
      'The code requires conductors and overcurrent devices for a motor circuit to be sized from a standard table value rather than the motor nameplate. At 460 volts, a 10 horsepower motor is 14 amperes, 25 horsepower is 34 amperes, and 100 horsepower is 124 amperes. Overload protection is the exception and uses the nameplate current.',
    basis:
      'Values as commonly published for NFPA 70 Table 430.250, for three-phase alternating current motors at usual speeds and normal torque. Verify against your adopted edition.',
    keywords: ['motor FLC', 'full load current', '430.250', 'motor amps', 'horsepower'],
    head: ['HP', '200 V', '208 V', '230 V', '460 V', '575 V'],
    rows: motorRows,
    notes: [
      'These values are used for conductor and overcurrent device sizing. Overload protection is sized from the motor nameplate instead.',
      'Values are for squirrel-cage and wound-rotor induction motors at usual speeds and normal torque characteristics. Synchronous motors and direct-current motors have separate tables.',
      'For a motor voltage between the listed columns, the code directs you to use the nearest listed voltage.',
    ],
    related: ['/controls/control-panels/pump-panels/lead-lag'],
    relatedCalculators: ['motor-branch-circuit', 'three-phase-power'],
  },
  {
    slug: 'standard-overcurrent-ratings',
    title: 'Standard Overcurrent Device Ratings',
    category: 'Electrical',
    summary:
      'The standard ampere ratings for fuses and inverse-time circuit breakers, used when rounding a calculated value to an available device.',
    answer:
      'Standard ampere ratings for fuses and inverse-time circuit breakers begin at 15, 20, 25, 30, 35, 40, 45, 50, and 60 amperes, then continue in larger steps. A calculated value that falls between two ratings normally rounds down, with specific exceptions permitting the next size up.',
    basis: 'Values as commonly published for NFPA 70 240.6(A). Verify against your adopted edition.',
    keywords: ['overcurrent', 'breaker sizes', 'fuse ratings', '240.6'],
    head: ['Standard ampere ratings'],
    rows: [
      [STANDARD_OCPD.slice(0, 12).join(', ')],
      [STANDARD_OCPD.slice(12, 22).join(', ')],
      [STANDARD_OCPD.slice(22).join(', ')],
    ],
    notes: [
      'Additional standard ratings for fuses include 1, 3, 6, 10, and 601 amperes.',
      'Where a calculated value does not correspond to a standard rating, the general rule rounds down. 240.4(B) and 430.52 contain the exceptions that permit rounding up in specific cases.',
    ],
    relatedCalculators: ['conductor-ampacity', 'motor-branch-circuit'],
  },
  {
    slug: 'emt-conduit-fill',
    title: 'EMT Conduit Areas and Fill Limits',
    category: 'Electrical',
    summary:
      'Internal area of electrical metallic tubing by trade size, with the usable area at the 53, 31, and 40 percent fill limits.',
    answer:
      'Conduit fill limits are 53% for a single conductor, 31% for two conductors, and 40% for three or more. Half-inch EMT has an internal area of 0.304 square inches, which gives 0.122 square inches usable at the 40% limit.',
    basis:
      'Areas as commonly published for NFPA 70 Chapter 9 Table 4 for EMT, with the fill percentages from Chapter 9 Table 1. Verify against your adopted edition.',
    keywords: ['conduit fill', 'EMT', 'raceway', 'chapter 9', '40 percent'],
    head: ['Trade size', 'Total area, sq in', '1 conductor (53%)', '2 conductors (31%)', '3+ conductors (40%)'],
    rows: Object.entries(EMT_AREA).map(([size, area]) => [
      `${size} in`,
      area.total.toFixed(3),
      area.fill53.toFixed(3),
      area.fill31.toFixed(3),
      area.fill40.toFixed(3),
    ]),
    notes: [
      'These areas are for EMT. Rigid metal conduit, IMC, PVC, and flexible raceways have different internal areas.',
      'A nipple not over 24 inches long is permitted 60% fill under Chapter 9 Note 4.',
      'Every conductor counts toward fill, including equipment grounding conductors, even though grounding conductors do not count toward the ampacity adjustment factor.',
    ],
    relatedCalculators: ['conduit-fill'],
  },
  {
    slug: 'plc-data-types',
    title: 'PLC Data Type Ranges',
    category: 'PLC & Data',
    summary:
      'Bit width and value range for the IEC 61131-3 elementary data types, with the practical notes that matter in controller programming.',
    answer:
      'The IEC 61131-3 integer types are bounded by bit width. An INT is 16-bit signed and holds -32,768 to 32,767. A DINT is 32-bit signed and holds about plus or minus 2.1 billion. A REAL is IEEE 754 single precision with roughly 7 significant decimal digits.',
    basis: 'IEC 61131-3 elementary data types. Vendor implementations vary in which types they support and what they call them.',
    keywords: ['data types', 'INT', 'DINT', 'REAL', 'range', 'IEC 61131-3'],
    head: ['Type', 'Bits', 'Minimum', 'Maximum', 'Notes'],
    rows: DATA_TYPES.map((type) => [type.name, String(type.bits), type.min, type.max, type.note]),
    notes: [
      'Integer overflow in a PLC usually wraps silently rather than raising an error, which is why a run-hour counter in an INT rolls over at 32,767 and starts from a large negative number.',
      'A REAL carries about 7 significant decimal digits. A totalizer above roughly 16.7 million stops resolving single units and appears to stall.',
      'A Modbus register is 16 bits. Anything larger spans two registers, and the standard does not define which comes first.',
    ],
    related: ['/controls/plc-systems/plc-fundamentals/memory'],
    relatedCalculators: ['data-type-ranges', 'number-base-converter', 'ieee-754-float'],
  },
  {
    slug: '4-20-ma-reference',
    title: '4-20 mA Signal Reference',
    category: 'Instrumentation',
    summary:
      'Current, percent of span, and voltage across a 250 ohm input for a 4-20 mA loop, including the NAMUR fault thresholds.',
    answer:
      'In a 4-20 mA loop, 4 mA is 0% of span and 20 mA is 100%. Across a 250 ohm input this becomes 1 to 5 volts. Under NAMUR NE 43, a reading below 3.6 mA or above 21 mA indicates a device fault rather than a process value.',
    basis:
      'Arithmetic relationships of the 4-20 mA standard, with fault thresholds from NAMUR NE 43.',
    keywords: ['4-20 mA', 'reference', 'percent of span', '250 ohm', 'NAMUR'],
    head: ['Current', 'Percent of span', 'Volts across 250 ohm', 'Meaning'],
    rows: [
      ['0 mA', '—', '0.00 V', 'Open loop: broken conductor, dead supply, or failed transmitter'],
      ['3.6 mA', '-2.5%', '0.90 V', 'NAMUR NE 43 low fault threshold'],
      ['3.8 mA', '-1.25%', '0.95 V', 'Below range, often a slightly under-ranged calibration'],
      ['4 mA', '0%', '1.00 V', 'Bottom of the calibrated range'],
      ['8 mA', '25%', '2.00 V', ''],
      ['12 mA', '50%', '3.00 V', 'Midpoint. The check that catches span errors.'],
      ['16 mA', '75%', '4.00 V', ''],
      ['20 mA', '100%', '5.00 V', 'Top of the calibrated range'],
      ['20.5 mA', '103%', '5.13 V', 'Above range but still measuring on many transmitters'],
      ['21 mA', '106%', '5.25 V', 'NAMUR NE 43 high fault threshold'],
      ['22 mA', '112.5%', '5.50 V', 'Typical maximum a transmitter will drive'],
    ],
    notes: [
      'The 4 mA live zero is what makes a broken conductor detectable. At 0 mA the loop is open; a 0-20 mA scheme cannot tell that apart from a genuine zero reading.',
      'Configure the fault direction deliberately. On a wet well level, failing low can make the controller think the well is empty and stop pumping while it fills.',
      'HART communication generally requires a minimum loop resistance of about 230 ohms, which the standard 250 ohm input satisfies.',
    ],
    related: ['/controls/plc-systems/analog-control/4-20-ma'],
    relatedCalculators: ['4-20-ma-scaling', 'loop-resistance', 'analog-raw-counts'],
  },
  {
    slug: 'enclosure-type-ratings',
    title: 'Enclosure Type Ratings',
    category: 'Control Panels',
    summary:
      'What each enclosure type rating protects against, and where each is normally used in controls work.',
    answer:
      'Enclosure type ratings describe what the enclosure protects against. Type 1 is indoor general purpose, Type 12 adds dust and dripping liquid, Type 3R adds outdoor rain, Type 4 adds hosedown and windblown dust, and Type 4X adds corrosion resistance. Type 4X stainless is the usual choice for wastewater.',
    basis:
      'Summarised from the enclosure type definitions used by NEMA and referenced in NFPA 70 Table 110.28. Consult the standard for the full definitions and test requirements.',
    keywords: ['NEMA', 'enclosure', 'Type 4X', 'IP rating', 'panel'],
    head: ['Type', 'Environment', 'Protects against', 'Typical use in controls'],
    rows: [
      ['Type 1', 'Indoor', 'Incidental contact with enclosed equipment, falling dirt', 'Clean, dry indoor electrical rooms'],
      ['Type 3R', 'Outdoor', 'Rain, sleet, snow, external ice formation', 'Outdoor equipment where dust ingress is acceptable'],
      ['Type 4', 'Indoor or outdoor', 'Windblown dust, rain, splashing water, hose-directed water', 'Wash-down areas, outdoor sites'],
      ['Type 4X', 'Indoor or outdoor', 'Type 4 plus corrosion', 'Wastewater, coastal sites, chemical feed areas'],
      ['Type 12', 'Indoor', 'Circulating dust, falling dirt, dripping non-corrosive liquid', 'Indoor plant floor areas'],
      ['Type 7', 'Indoor hazardous', 'Contains an internal explosion in Class I Division 1 areas', 'Classified areas, with the applicable group'],
      ['Type 9', 'Indoor hazardous', 'Combustible dust environments, Class II', 'Classified dust areas'],
    ],
    notes: [
      'In wastewater, hydrogen sulfide attacks painted steel. 316 stainless in a Type 4X rating costs more initially and is routinely the cheaper decision over the life of a lift station.',
      'A type rating is not preserved through an unsealed penetration. Drilling an enclosure without a properly rated fitting invalidates the rating.',
      'NEMA type ratings and IEC IP codes are not directly interchangeable. A type rating covers corrosion, icing, and oil resistance that an IP code does not.',
    ],
    related: ['/controls/control-panels/panel-design/enclosure-selection'],
    relatedCalculators: ['enclosure-heat-load'],
  },
  {
    slug: 'unit-conversions',
    title: 'Controls Unit Conversion Reference',
    category: 'Conversions',
    summary:
      'The conversions that come up constantly in controls and water work: pressure, flow, level, power, and temperature.',
    answer:
      'The conversions used most often in water and wastewater controls: 1 psi is 2.31 feet of water, 1 million gallons per day is 694.4 gallons per minute, 1 cubic foot is 7.48 gallons, 1 horsepower is 0.746 kilowatts, and 1 bar is 14.5 psi.',
    basis: 'Standard unit conversions. Values rounded for practical use.',
    keywords: ['conversion', 'psi', 'feet of head', 'gpm', 'MGD', 'units'],
    head: ['From', 'To', 'Multiply by', 'Notes'],
    rows: [
      ['psi', 'feet of water', '2.3067', 'For water at standard conditions. Divide by specific gravity for other fluids.'],
      ['feet of water', 'psi', '0.4335', ''],
      ['psi', 'bar', '0.06895', ''],
      ['bar', 'psi', '14.504', ''],
      ['psi', 'kPa', '6.8948', ''],
      ['inches of water column', 'psi', '0.03613', 'Common on low differential pressure ranges'],
      ['gpm', 'MGD', '0.00144', ''],
      ['MGD', 'gpm', '694.44', ''],
      ['gpm', 'cfs', '0.002228', ''],
      ['cfs', 'gpm', '448.83', ''],
      ['gpm', 'L/s', '0.06309', ''],
      ['L/s', 'gpm', '15.850', ''],
      ['gpm', 'm3/h', '0.2271', ''],
      ['m3/h', 'gpm', '4.4029', ''],
      ['cubic feet', 'US gallons', '7.4805', ''],
      ['US gallons', 'cubic feet', '0.13368', ''],
      ['US gallons', 'litres', '3.7854', ''],
      ['US gallons', 'pounds of water', '8.34', 'The constant behind the pounds formula'],
      ['horsepower', 'kilowatts', '0.7457', ''],
      ['kilowatts', 'horsepower', '1.3410', ''],
      ['degrees C', 'degrees F', 'x 1.8 then + 32', ''],
      ['degrees F', 'degrees C', '- 32 then / 1.8', ''],
      ['feet', 'metres', '0.3048', ''],
      ['inches', 'millimetres', '25.4', ''],
    ],
    notes: [
      'The 2.31 feet per psi figure assumes water at standard conditions. Divide by specific gravity for another fluid.',
      'US gallons throughout. An imperial gallon is about 1.2 US gallons, and mixing the two produces a 20% error.',
    ],
    relatedCalculators: ['flow-unit-converter', 'pump-horsepower', 'chemical-dosing'],
  },
];

export const TABLE_BY_SLUG: Record<string, RefTable> = Object.fromEntries(
  REFERENCE_TABLES.map((table) => [table.slug, table]),
);

export function isTableSlug(slug: string): boolean {
  return slug in TABLE_BY_SLUG;
}

export const TABLE_CATEGORIES: RefTableCategory[] = [
  'Electrical',
  'Control Panels',
  'Instrumentation',
  'PLC & Data',
  'Conversions',
];

export function tablePath(slug: string): string {
  return `/tables/${slug}`;
}
