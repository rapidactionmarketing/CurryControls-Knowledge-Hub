/**
 * Shared numeric reference data.
 *
 * IMPORTANT: the values here are reproduced for convenience. Code tables are
 * revised between editions and adopted differently by jurisdiction, so the
 * edition adopted where the work is performed governs, not this file. Every
 * calculator that reads one of these tables displays the value it used, so a
 * disagreement with the reader's own code book is visible immediately rather
 * than hidden inside an answer.
 */

export type AwgSize = {
  /** Display label, e.g. "12", "1/0", "250 kcmil". */
  label: string;
  /** Sort key. Larger conductor means larger number. */
  order: number;
  /** Circular mils. A geometric definition, not a code value. */
  cmil: number;
  /** Approximate cross-sectional area of THHN/THWN-2, square inches. */
  thhnArea: number;
};

/** AWG and kcmil sizes, smallest to largest. */
export const AWG_SIZES: AwgSize[] = [
  { label: '14', order: 1, cmil: 4110, thhnArea: 0.0097 },
  { label: '12', order: 2, cmil: 6530, thhnArea: 0.0133 },
  { label: '10', order: 3, cmil: 10380, thhnArea: 0.0211 },
  { label: '8', order: 4, cmil: 16510, thhnArea: 0.0366 },
  { label: '6', order: 5, cmil: 26240, thhnArea: 0.0507 },
  { label: '4', order: 6, cmil: 41740, thhnArea: 0.0824 },
  { label: '3', order: 7, cmil: 52620, thhnArea: 0.0973 },
  { label: '2', order: 8, cmil: 66360, thhnArea: 0.1158 },
  { label: '1', order: 9, cmil: 83690, thhnArea: 0.1562 },
  { label: '1/0', order: 10, cmil: 105600, thhnArea: 0.1855 },
  { label: '2/0', order: 11, cmil: 133100, thhnArea: 0.2223 },
  { label: '3/0', order: 12, cmil: 167800, thhnArea: 0.2679 },
  { label: '4/0', order: 13, cmil: 211600, thhnArea: 0.3237 },
  { label: '250 kcmil', order: 14, cmil: 250000, thhnArea: 0.397 },
  { label: '300 kcmil', order: 15, cmil: 300000, thhnArea: 0.4608 },
  { label: '350 kcmil', order: 16, cmil: 350000, thhnArea: 0.5242 },
  { label: '400 kcmil', order: 17, cmil: 400000, thhnArea: 0.5863 },
  { label: '500 kcmil', order: 18, cmil: 500000, thhnArea: 0.7073 },
  { label: '600 kcmil', order: 19, cmil: 600000, thhnArea: 0.8676 },
  { label: '750 kcmil', order: 20, cmil: 750000, thhnArea: 1.0496 },
  { label: '1000 kcmil', order: 21, cmil: 1000000, thhnArea: 1.3478 },
];

export const AWG_BY_LABEL: Record<string, AwgSize> = Object.fromEntries(
  AWG_SIZES.map((size) => [size.label, size]),
);

/**
 * Allowable ampacity, as commonly published for NFPA 70 Table 310.16.
 *
 * Basis: not more than three current-carrying conductors in a raceway, cable,
 * or earth, at an ambient of 30 degrees C. Correction and adjustment factors
 * apply on top of these figures. VERIFY against your adopted edition.
 *
 * Values are [60C, 75C, 90C]. A null means the size is not listed for that
 * material.
 */
export const AMPACITY_310_16: Record<'copper' | 'aluminum', Record<string, [number, number, number] | null>> = {
  copper: {
    '14': [15, 20, 25],
    '12': [20, 25, 30],
    '10': [30, 35, 40],
    '8': [40, 50, 55],
    '6': [55, 65, 75],
    '4': [70, 85, 95],
    '3': [85, 100, 115],
    '2': [95, 115, 130],
    '1': [110, 130, 145],
    '1/0': [125, 150, 170],
    '2/0': [145, 175, 195],
    '3/0': [165, 200, 225],
    '4/0': [195, 230, 260],
    '250 kcmil': [215, 255, 290],
    '300 kcmil': [240, 285, 320],
    '350 kcmil': [260, 310, 350],
    '400 kcmil': [280, 335, 380],
    '500 kcmil': [320, 380, 430],
    '600 kcmil': [350, 420, 475],
    '750 kcmil': [400, 475, 535],
    '1000 kcmil': [455, 545, 615],
  },
  aluminum: {
    '14': null,
    '12': [15, 20, 25],
    '10': [25, 30, 35],
    '8': [35, 40, 45],
    '6': [40, 50, 55],
    '4': [55, 65, 75],
    '3': [65, 75, 85],
    '2': [75, 90, 100],
    '1': [85, 100, 115],
    '1/0': [100, 120, 135],
    '2/0': [115, 135, 150],
    '3/0': [130, 155, 175],
    '4/0': [150, 180, 205],
    '250 kcmil': [170, 205, 230],
    '300 kcmil': [195, 230, 260],
    '350 kcmil': [210, 250, 280],
    '400 kcmil': [225, 270, 305],
    '500 kcmil': [260, 310, 350],
    '600 kcmil': [285, 340, 385],
    '750 kcmil': [320, 385, 435],
    '1000 kcmil': [375, 445, 500],
  },
};

/** Column index into an ampacity triple. */
export const TEMP_COLUMN: Record<string, 0 | 1 | 2> = { '60': 0, '75': 1, '90': 2 };

/**
 * Ambient temperature correction factors, as commonly published for
 * NFPA 70 Table 310.15(B)(1), based on 30 degrees C.
 *
 * Each row is [maxAmbientC, factor60, factor75, factor90]. A null factor means
 * the conductor is not usable at that ambient. VERIFY against your edition.
 */
export const TEMP_CORRECTION: [number, number | null, number | null, number][] = [
  [10, 1.29, 1.2, 1.15],
  [15, 1.22, 1.15, 1.12],
  [20, 1.15, 1.11, 1.08],
  [25, 1.08, 1.05, 1.04],
  [30, 1.0, 1.0, 1.0],
  [35, 0.91, 0.94, 0.96],
  [40, 0.82, 0.88, 0.91],
  [45, 0.71, 0.82, 0.87],
  [50, 0.58, 0.75, 0.82],
  [55, 0.41, 0.67, 0.76],
  [60, null, 0.58, 0.71],
  [65, null, 0.47, 0.65],
  [70, null, 0.33, 0.58],
  [75, null, null, 0.5],
  [80, null, null, 0.41],
  [85, null, null, 0.29],
];

/** Ambient correction factor for a temperature and insulation rating. */
export function temperatureCorrection(
  ambientC: number,
  rating: 60 | 75 | 90,
): number | null {
  const column = rating === 60 ? 1 : rating === 75 ? 2 : 3;
  for (const row of TEMP_CORRECTION) {
    if (ambientC <= row[0]) return row[column] as number | null;
  }
  return null;
}

/**
 * Adjustment factors for more than three current-carrying conductors, as
 * commonly published for NFPA 70 Table 310.15(C)(1).
 */
export const ADJUSTMENT_FACTORS: { min: number; max: number; factor: number }[] = [
  { min: 4, max: 6, factor: 0.8 },
  { min: 7, max: 9, factor: 0.7 },
  { min: 10, max: 20, factor: 0.5 },
  { min: 21, max: 30, factor: 0.45 },
  { min: 31, max: 40, factor: 0.4 },
  { min: 41, max: Number.POSITIVE_INFINITY, factor: 0.35 },
];

export function conductorAdjustment(count: number): number {
  if (count <= 3) return 1;
  return ADJUSTMENT_FACTORS.find((row) => count >= row.min && count <= row.max)?.factor ?? 0.35;
}

/**
 * Small conductor overcurrent limits, as commonly published for NFPA 70
 * 240.4(D). These cap the overcurrent device regardless of ampacity.
 */
export const SMALL_CONDUCTOR_LIMIT: Record<'copper' | 'aluminum', Record<string, number>> = {
  copper: { '14': 15, '12': 20, '10': 30 },
  aluminum: { '12': 15, '10': 25 },
};

/** Standard overcurrent device ratings, as commonly published for 240.6(A). */
export const STANDARD_OCPD = [
  15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200, 225, 250, 300, 350,
  400, 450, 500, 600, 700, 800, 1000, 1200, 1600, 2000, 2500, 3000, 4000, 5000, 6000,
];

export function nextStandardOcpd(amps: number): number {
  return STANDARD_OCPD.find((rating) => rating >= amps) ?? STANDARD_OCPD[STANDARD_OCPD.length - 1]!;
}

export function largestOcpdNotExceeding(amps: number): number {
  let result = STANDARD_OCPD[0]!;
  for (const rating of STANDARD_OCPD) {
    if (rating <= amps) result = rating;
    else break;
  }
  return result;
}

/**
 * Three-phase motor full-load current, as commonly published for NFPA 70
 * Table 430.250. Columns are [200V, 208V, 230V, 460V, 575V].
 *
 * These are the values the code requires for sizing conductors and
 * overcurrent devices, in place of the motor nameplate current. VERIFY.
 */
export const MOTOR_FLC_3PH: Record<string, [number, number, number, number, number]> = {
  '0.5': [2.5, 2.4, 2.2, 1.1, 0.9],
  '0.75': [3.7, 3.5, 3.2, 1.6, 1.3],
  '1': [4.8, 4.6, 4.2, 2.1, 1.7],
  '1.5': [6.9, 6.6, 6.0, 3.0, 2.4],
  '2': [7.8, 7.5, 6.8, 3.4, 2.7],
  '3': [11.0, 10.6, 9.6, 4.8, 3.9],
  '5': [17.5, 16.7, 15.2, 7.6, 6.1],
  '7.5': [25.3, 24.2, 22, 11, 9],
  '10': [32.2, 30.8, 28, 14, 11],
  '15': [48.3, 46.2, 42, 21, 17],
  '20': [62.1, 59.4, 54, 27, 22],
  '25': [78.2, 74.8, 68, 34, 27],
  '30': [92, 88, 80, 40, 32],
  '40': [120, 114, 104, 52, 41],
  '50': [150, 143, 130, 65, 52],
  '60': [177, 169, 154, 77, 62],
  '75': [221, 211, 192, 96, 77],
  '100': [285, 273, 248, 124, 99],
  '125': [359, 343, 312, 156, 125],
  '150': [414, 396, 360, 180, 144],
  '200': [552, 528, 480, 240, 192],
};

export const MOTOR_VOLTAGES = ['200', '208', '230', '460', '575'] as const;
export const MOTOR_VOLTAGE_INDEX: Record<string, 0 | 1 | 2 | 3 | 4> = {
  '200': 0,
  '208': 1,
  '230': 2,
  '460': 3,
  '575': 4,
};

/** Resistivity constants for the circular-mil voltage drop method. */
export const K_FACTOR = { copper: 12.9, aluminum: 21.2 } as const;

/** IEC 61131-3 integer data type ranges, with the bit width of each. */
export const DATA_TYPES: {
  name: string;
  bits: number;
  signed: boolean;
  min: string;
  max: string;
  note: string;
}[] = [
  { name: 'BOOL', bits: 1, signed: false, min: '0', max: '1', note: 'A single bit. Stored in a byte or packed into a word depending on platform.' },
  { name: 'BYTE / USINT', bits: 8, signed: false, min: '0', max: '255', note: 'Unsigned 8-bit.' },
  { name: 'SINT', bits: 8, signed: true, min: '-128', max: '127', note: 'Signed 8-bit.' },
  { name: 'WORD / UINT', bits: 16, signed: false, min: '0', max: '65,535', note: 'Unsigned 16-bit. One Modbus register.' },
  { name: 'INT', bits: 16, signed: true, min: '-32,768', max: '32,767', note: 'Signed 16-bit. The most common PLC integer, and the one analog values usually land in.' },
  { name: 'DWORD / UDINT', bits: 32, signed: false, min: '0', max: '4,294,967,295', note: 'Unsigned 32-bit. Two Modbus registers.' },
  { name: 'DINT', bits: 32, signed: true, min: '-2,147,483,648', max: '2,147,483,647', note: 'Signed 32-bit. Used for totalizers and run-hour counters.' },
  { name: 'LWORD / ULINT', bits: 64, signed: false, min: '0', max: '18,446,744,073,709,551,615', note: 'Unsigned 64-bit.' },
  { name: 'LINT', bits: 64, signed: true, min: '-9,223,372,036,854,775,808', max: '9,223,372,036,854,775,807', note: 'Signed 64-bit.' },
  { name: 'REAL', bits: 32, signed: true, min: '±1.18e-38', max: '±3.40e38', note: 'IEEE 754 single precision. About 7 significant decimal digits, which is why a large totalizer loses resolution in a REAL.' },
  { name: 'LREAL', bits: 64, signed: true, min: '±2.23e-308', max: '±1.80e308', note: 'IEEE 754 double precision. About 15 significant decimal digits.' },
];
