/**
 * NFPA 70 (NEC) Chapter 9, Tables 1, 4 and 5: raceway fill.
 *
 * DESIGN RULE: one source number per row, everything else derived.
 *
 * Table 4 publishes each raceway's internal diameter and its area at several
 * fill percentages. Table 5 publishes each insulated conductor's approximate
 * diameter and area. In both tables the area is nothing more than pi/4 times
 * the diameter squared, so this file stores only the diameter and computes the
 * area. That halves the number of transcribed values and, more importantly,
 * lets scripts/validate-nec-tables.mjs recompute every area and compare it to
 * an independently recorded copy of the published figure. A transcription
 * error in either place shows up as a mismatch instead of a silently wrong
 * calculator.
 *
 * These values are reproduced for convenience. The edition of the code adopted
 * in your jurisdiction governs, and a value here must be checked against it
 * before it is relied on for any installation.
 */

/** Trade sizes in ascending order, as strings so 1-1/4 and 3/8 read naturally. */
export const TRADE_SIZES = [
  '3/8', '1/2', '3/4', '1', '1-1/4', '1-1/2', '2', '2-1/2', '3', '3-1/2', '4', '5', '6',
] as const;
export type TradeSize = (typeof TRADE_SIZES)[number];

export type ConduitType = {
  key: string;
  /** Short label used in selects and column heads. */
  label: string;
  name: string;
  /** NEC article that governs the raceway. */
  article: string;
  /** Internal diameter, inches, by trade size. Chapter 9 Table 4. */
  internalDiameter: Partial<Record<TradeSize, number>>;
};

export type ConduitArea = {
  /** 100% internal area, sq in. */
  total: number;
  /** One conductor, Chapter 9 Table 1. */
  fill53: number;
  /** Two conductors. */
  fill31: number;
  /** Three or more conductors. */
  fill40: number;
  /** Nipple not over 24 in long, Chapter 9 Note 4. */
  fill60: number;
};

export function areaFromDiameter(inches: number): number {
  return (Math.PI / 4) * inches * inches;
}

/**
 * The printed tables round raceway areas to three decimals and conductor
 * areas to four. Rounding here the same way means a sum or a percentage from
 * this site matches, to the last digit, what a reader working from the code
 * book gets. The validator compares these rounded figures to its independent
 * copy of the published values.
 */
const round3 = (n: number) => Math.round(n * 1000) / 1000;
const round4 = (n: number) => Math.round(n * 10000) / 10000;

export function conduitArea(internalDiameter: number): ConduitArea {
  const total = round3(areaFromDiameter(internalDiameter));
  return {
    total,
    fill53: round3(total * 0.53),
    fill31: round3(total * 0.31),
    fill40: round3(total * 0.4),
    fill60: round3(total * 0.6),
  };
}

/* ---------------------------- Table 4: raceways --------------------------- */

export const CONDUIT_TYPES: ConduitType[] = [
  {
    key: 'emt',
    label: 'EMT',
    name: 'Electrical Metallic Tubing',
    article: 'Article 358',
    internalDiameter: {
      '1/2': 0.622, '3/4': 0.824, '1': 1.049, '1-1/4': 1.38, '1-1/2': 1.61,
      '2': 2.067, '2-1/2': 2.731, '3': 3.356, '3-1/2': 3.834, '4': 4.334,
    },
  },
  {
    key: 'ent',
    label: 'ENT',
    name: 'Electrical Nonmetallic Tubing',
    article: 'Article 362',
    internalDiameter: {
      '1/2': 0.56, '3/4': 0.76, '1': 1.0, '1-1/4': 1.34, '1-1/2': 1.57, '2': 2.02,
    },
  },
  {
    key: 'fmc',
    label: 'FMC',
    name: 'Flexible Metal Conduit',
    article: 'Article 348',
    internalDiameter: {
      '3/8': 0.384, '1/2': 0.635, '3/4': 0.824, '1': 1.02, '1-1/4': 1.275, '1-1/2': 1.538,
      '2': 2.04, '2-1/2': 2.5, '3': 3.0, '3-1/2': 3.5, '4': 4.0,
    },
  },
  {
    key: 'imc',
    label: 'IMC',
    name: 'Intermediate Metal Conduit',
    article: 'Article 342',
    internalDiameter: {
      '1/2': 0.66, '3/4': 0.864, '1': 1.105, '1-1/4': 1.448, '1-1/2': 1.683,
      '2': 2.15, '2-1/2': 2.557, '3': 3.176, '3-1/2': 3.671, '4': 4.166,
    },
  },
  {
    key: 'lfmc',
    label: 'LFMC',
    name: 'Liquidtight Flexible Metal Conduit',
    article: 'Article 350',
    internalDiameter: {
      '3/8': 0.494, '1/2': 0.632, '3/4': 0.83, '1': 1.054, '1-1/4': 1.395, '1-1/2': 1.588,
      '2': 2.033, '2-1/2': 2.493, '3': 3.085, '3-1/2': 3.52, '4': 4.02,
    },
  },
  {
    key: 'lfnc-b',
    label: 'LFNC-B',
    name: 'Liquidtight Flexible Nonmetallic Conduit, Type B',
    article: 'Article 356',
    internalDiameter: {
      '3/8': 0.494, '1/2': 0.632, '3/4': 0.83, '1': 1.054, '1-1/4': 1.395, '1-1/2': 1.588, '2': 2.033,
    },
  },
  {
    key: 'rmc',
    label: 'RMC',
    name: 'Rigid Metal Conduit',
    article: 'Article 344',
    internalDiameter: {
      '1/2': 0.632, '3/4': 0.836, '1': 1.063, '1-1/4': 1.394, '1-1/2': 1.624, '2': 2.083,
      '2-1/2': 2.489, '3': 3.09, '3-1/2': 3.57, '4': 4.05, '5': 5.073, '6': 6.093,
    },
  },
  {
    key: 'pvc-80',
    label: 'PVC Sch 80',
    name: 'Rigid PVC Conduit, Schedule 80',
    article: 'Article 352',
    internalDiameter: {
      '1/2': 0.526, '3/4': 0.722, '1': 0.936, '1-1/4': 1.255, '1-1/2': 1.476, '2': 1.913,
      '2-1/2': 2.29, '3': 2.864, '3-1/2': 3.326, '4': 3.786, '5': 4.768, '6': 5.709,
    },
  },
  {
    key: 'pvc-40',
    label: 'PVC Sch 40',
    name: 'Rigid PVC Conduit, Schedule 40',
    article: 'Article 352',
    internalDiameter: {
      '1/2': 0.602, '3/4': 0.804, '1': 1.029, '1-1/4': 1.36, '1-1/2': 1.59, '2': 2.047,
      '2-1/2': 2.445, '3': 3.042, '3-1/2': 3.521, '4': 3.998, '5': 5.016, '6': 6.031,
    },
  },
];

export const CONDUIT_BY_KEY: Record<string, ConduitType> = Object.fromEntries(
  CONDUIT_TYPES.map((c) => [c.key, c]),
);

/** Trade sizes a raceway is made in, ascending. */
export function conduitSizes(conduit: ConduitType): TradeSize[] {
  return TRADE_SIZES.filter((size) => conduit.internalDiameter[size] !== undefined);
}

/* -------------------------- Table 5: conductors --------------------------- */

export type InsulationType = {
  key: string;
  /** The insulation designations that share these dimensions. */
  label: string;
  description: string;
  /** Approximate overall diameter, inches, by AWG or kcmil label. Chapter 9 Table 5. */
  diameter: Record<string, number>;
};

export const INSULATION_TYPES: InsulationType[] = [
  {
    key: 'thhn',
    label: 'THHN, THWN, THWN-2',
    description: 'Thin nylon-jacketed thermoplastic. The most common building wire and the smallest of these for a given size.',
    diameter: {
      '14': 0.111, '12': 0.13, '10': 0.164, '8': 0.216, '6': 0.254, '4': 0.324, '3': 0.352, '2': 0.384,
      '1': 0.446, '1/0': 0.486, '2/0': 0.532, '3/0': 0.584, '4/0': 0.642,
      '250 kcmil': 0.711, '300 kcmil': 0.766, '350 kcmil': 0.817, '400 kcmil': 0.864, '500 kcmil': 0.949,
      '600 kcmil': 1.051, '750 kcmil': 1.156, '1000 kcmil': 1.31,
    },
  },
  {
    key: 'xhhw',
    label: 'XHHW, XHHW-2, XHH',
    description: 'Cross-linked polyethylene. Slightly larger than THHN in small sizes, slightly smaller from 4 AWG up.',
    diameter: {
      '14': 0.133, '12': 0.152, '10': 0.176, '8': 0.236, '6': 0.274, '4': 0.322, '3': 0.35, '2': 0.382,
      '1': 0.442, '1/0': 0.482, '2/0': 0.528, '3/0': 0.58, '4/0': 0.638,
      '250 kcmil': 0.705, '300 kcmil': 0.76, '350 kcmil': 0.811, '400 kcmil': 0.858, '500 kcmil': 0.943,
      '600 kcmil': 1.053, '750 kcmil': 1.158, '1000 kcmil': 1.312,
    },
  },
  {
    key: 'tw',
    label: 'TW',
    description: 'Moisture-resistant thermoplastic, 60°C. Shares dimensions with THW from 6 AWG up.',
    diameter: {
      '14': 0.133, '12': 0.152, '10': 0.176, '8': 0.236, '6': 0.304, '4': 0.352, '3': 0.38, '2': 0.412,
      '1': 0.492, '1/0': 0.532, '2/0': 0.578, '3/0': 0.63, '4/0': 0.688,
      '250 kcmil': 0.765, '300 kcmil': 0.82, '350 kcmil': 0.871, '400 kcmil': 0.918, '500 kcmil': 1.003,
      '600 kcmil': 1.113, '750 kcmil': 1.218, '1000 kcmil': 1.372,
    },
  },
  {
    key: 'thw',
    label: 'THW, THHW, THW-2',
    description: 'Moisture and heat resistant thermoplastic. Thicker than TW in 14 through 8 AWG, identical from 6 AWG up.',
    diameter: {
      '14': 0.163, '12': 0.182, '10': 0.206, '8': 0.266, '6': 0.304, '4': 0.352, '3': 0.38, '2': 0.412,
      '1': 0.492, '1/0': 0.532, '2/0': 0.578, '3/0': 0.63, '4/0': 0.688,
      '250 kcmil': 0.765, '300 kcmil': 0.82, '350 kcmil': 0.871, '400 kcmil': 0.918, '500 kcmil': 1.003,
      '600 kcmil': 1.113, '750 kcmil': 1.218, '1000 kcmil': 1.372,
    },
  },
  {
    key: 'rhw',
    label: 'RHH, RHW, RHW-2 (with outer covering)',
    description: 'Thermoset rubber with a fibrous outer covering. The largest of these for a given size; using THHN areas for it badly understates fill.',
    diameter: {
      '14': 0.193, '12': 0.212, '10': 0.236, '8': 0.326, '6': 0.364, '4': 0.412, '3': 0.44, '2': 0.472,
      '1': 0.582, '1/0': 0.622, '2/0': 0.668, '3/0': 0.72, '4/0': 0.778,
      '250 kcmil': 0.895, '300 kcmil': 0.95, '350 kcmil': 1.001, '400 kcmil': 1.048, '500 kcmil': 1.133,
      '600 kcmil': 1.243, '750 kcmil': 1.348, '1000 kcmil': 1.502,
    },
  },
];

export const INSULATION_BY_KEY: Record<string, InsulationType> = Object.fromEntries(
  INSULATION_TYPES.map((i) => [i.key, i]),
);

/** Approximate area of one insulated conductor, sq in. */
export function conductorArea(insulation: InsulationType, sizeLabel: string): number | undefined {
  const d = insulation.diameter[sizeLabel];
  return d === undefined ? undefined : round4(areaFromDiameter(d));
}
