/**
 * Structural validation for the NEC Chapter 9 raceway and conductor data.
 *
 * The data file stores only diameters and derives every area. This script
 * holds a SEPARATELY recorded copy of the published area figures and checks
 * that the derived areas reproduce them. The two were written independently,
 * so a transcription slip in either shows up here as a mismatch rather than
 * as a silently wrong conduit-fill answer.
 *
 * It also checks the things that must be true of any correct copy of these
 * tables regardless of edition: areas grow with trade size, conductor
 * diameters grow with conductor size, TW never exceeds THW, and RHW with its
 * outer covering is the largest insulation at every size.
 *
 * This is not a substitute for checking against the adopted edition of the
 * code. It is the strongest check available to a build that cannot open one.
 *
 * Run: node scripts/validate-nec-tables.mjs
 */

import { CONDUIT_TYPES, INSULATION_TYPES, TRADE_SIZES, areaFromDiameter, conduitArea, conductorArea } from '../src/data/nec-chapter9.ts';
const note = (msg) => console.log('note  ' + msg);

let failures = 0;
const fail = (msg) => { failures += 1; console.error('FAIL  ' + msg); };
const pass = (msg) => console.log('pass  ' + msg);

/* ------------------- Table 4 published 100% areas, sq in ------------------- */
// Recorded from memory of the published table, separately from the diameters
// in the data file. ENT is diameter-only: its published area was not
// independently recalled with confidence, so it is checked for shape only.
const PUBLISHED_CONDUIT = {
  emt: { '1/2': 0.304, '3/4': 0.533, '1': 0.864, '1-1/4': 1.496, '1-1/2': 2.036, '2': 3.356, '2-1/2': 5.858, '3': 8.846, '3-1/2': 11.545, '4': 14.753 },
  fmc: { '3/8': 0.116, '1/2': 0.317, '3/4': 0.533, '1': 0.817, '1-1/4': 1.277, '1-1/2': 1.858, '2': 3.269, '2-1/2': 4.909, '3': 7.069, '3-1/2': 9.621, '4': 12.566 },
  imc: { '1/2': 0.342, '3/4': 0.586, '1': 0.959, '1-1/4': 1.647, '1-1/2': 2.225, '2': 3.63, '2-1/2': 5.135, '3': 7.922, '3-1/2': 10.584, '4': 13.631 },
  lfmc: { '3/8': 0.192, '1/2': 0.314, '3/4': 0.541, '1': 0.873, '1-1/4': 1.528, '1-1/2': 1.981, '2': 3.246, '2-1/2': 4.881, '3': 7.475, '3-1/2': 9.731, '4': 12.692 },
  'lfnc-b': { '3/8': 0.192, '1/2': 0.314, '3/4': 0.541, '1': 0.873, '1-1/4': 1.528, '1-1/2': 1.981, '2': 3.246 },
  rmc: { '1/2': 0.314, '3/4': 0.549, '1': 0.887, '1-1/4': 1.526, '1-1/2': 2.071, '2': 3.408, '2-1/2': 4.866, '3': 7.499, '3-1/2': 10.01, '4': 12.882, '5': 20.212, '6': 29.158 },
  'pvc-80': { '1/2': 0.217, '3/4': 0.409, '1': 0.688, '1-1/4': 1.237, '1-1/2': 1.711, '2': 2.874, '2-1/2': 4.119, '3': 6.442, '3-1/2': 8.688, '4': 11.258, '5': 17.855, '6': 25.598 },
  'pvc-40': { '1/2': 0.285, '3/4': 0.508, '1': 0.832, '1-1/4': 1.453, '1-1/2': 1.986, '2': 3.291, '2-1/2': 4.695, '3': 7.268, '3-1/2': 9.737, '4': 12.554, '5': 19.761, '6': 28.567 },
};

/* --------------- Table 5 published approximate areas, sq in --------------- */
const PUBLISHED_CONDUCTOR = {
  thhn: { '14': 0.0097, '12': 0.0133, '10': 0.0211, '8': 0.0366, '6': 0.0507, '4': 0.0824, '3': 0.0973, '2': 0.1158, '1': 0.1562, '1/0': 0.1855, '2/0': 0.2223, '3/0': 0.2679, '4/0': 0.3237, '250 kcmil': 0.397, '300 kcmil': 0.4608, '350 kcmil': 0.5242, '400 kcmil': 0.5863, '500 kcmil': 0.7073, '600 kcmil': 0.8676, '750 kcmil': 1.0496, '1000 kcmil': 1.3478 },
  xhhw: { '14': 0.0139, '12': 0.0181, '10': 0.0243, '8': 0.0437, '6': 0.059, '4': 0.0814, '3': 0.0962, '2': 0.1146, '1': 0.1534, '1/0': 0.1825, '2/0': 0.219, '3/0': 0.2642, '4/0': 0.3197, '250 kcmil': 0.3904, '300 kcmil': 0.4536, '350 kcmil': 0.5166, '400 kcmil': 0.5782, '500 kcmil': 0.6984, '600 kcmil': 0.8709, '750 kcmil': 1.0532, '1000 kcmil': 1.3519 },
  tw: { '14': 0.0139, '12': 0.0181, '10': 0.0243, '8': 0.0437, '6': 0.0726, '4': 0.0973, '3': 0.1134, '2': 0.1333, '1': 0.1901, '1/0': 0.2223, '2/0': 0.2624, '3/0': 0.3117, '4/0': 0.3718, '250 kcmil': 0.4596, '300 kcmil': 0.5281, '350 kcmil': 0.5958, '400 kcmil': 0.6619, '500 kcmil': 0.7901, '600 kcmil': 0.9729, '750 kcmil': 1.1652, '1000 kcmil': 1.4784 },
  thw: { '14': 0.0209, '12': 0.026, '10': 0.0333, '8': 0.0556, '6': 0.0726, '4': 0.0973, '3': 0.1134, '2': 0.1333, '1': 0.1901, '1/0': 0.2223, '2/0': 0.2624, '3/0': 0.3117, '4/0': 0.3718, '250 kcmil': 0.4596, '300 kcmil': 0.5281, '350 kcmil': 0.5958, '400 kcmil': 0.6619, '500 kcmil': 0.7901, '600 kcmil': 0.9729, '750 kcmil': 1.1652, '1000 kcmil': 1.4784 },
  rhw: { '14': 0.0293, '12': 0.0353, '10': 0.0437, '8': 0.0835, '6': 0.1041, '4': 0.1333, '3': 0.1521, '2': 0.175, '1': 0.266, '1/0': 0.3039, '2/0': 0.3505, '3/0': 0.4072, '4/0': 0.4754, '250 kcmil': 0.6291, '300 kcmil': 0.7088, '350 kcmil': 0.787, '400 kcmil': 0.8626, '500 kcmil': 1.0082, '600 kcmil': 1.2135, '750 kcmil': 1.4272, '1000 kcmil': 1.7719 },
};

const SIZE_ORDER = ['14','12','10','8','6','4','3','2','1','1/0','2/0','3/0','4/0','250 kcmil','300 kcmil','350 kcmil','400 kcmil','500 kcmil','600 kcmil','750 kcmil','1000 kcmil'];

/* ------------------------------ Table 4 ---------------------------------- */

console.log('\nTable 4: derived area vs published area (tolerance 0.0006 sq in, half a rounding unit)');
let checked = 0;
for (const c of CONDUIT_TYPES) {
  const pub = PUBLISHED_CONDUIT[c.key];
  if (!pub) { console.log(`skip  ${c.label}: no independent published record, diameter-only`); continue; }
  for (const [size, published] of Object.entries(pub)) {
    const id = c.internalDiameter[size];
    if (id === undefined) { fail(`${c.label} ${size}: published table has a row but data file has no diameter`); continue; }
    // The cross-check is on the exact derivation: the published figure must be
    // the derived area to within half a rounding unit. Where the exact value
    // sits on a rounding boundary the site can print one last digit different
    // from the book; that is reported, not failed, because it is not an error
    // in either number.
    const exact = areaFromDiameter(id);
    const shown = conduitArea(id).total;
    checked += 1;
    if (Math.abs(exact - published) > 0.0006) fail(`${c.label} ${size}: derived ${exact.toFixed(4)} vs published ${published}`);
    else if (Math.abs(shown - published) > 0.0001) note(`${c.label} ${size}: book prints ${published.toFixed(3)}, site prints ${shown.toFixed(3)} (exact ${exact.toFixed(4)})`);
  }
  for (const size of Object.keys(c.internalDiameter)) {
    if (pub[size] === undefined) fail(`${c.label} ${size}: data file has a diameter with no published row to check it against`);
  }
}
if (!failures) pass(`${checked} conduit areas reproduce the published figure`);

console.log('\nTable 4: area increases with trade size within each raceway');
for (const c of CONDUIT_TYPES) {
  let prev = 0;
  for (const size of TRADE_SIZES) {
    const id = c.internalDiameter[size];
    if (id === undefined) continue;
    if (id <= prev) fail(`${c.label}: ${size} (${id}) not larger than the previous size (${prev})`);
    prev = id;
  }
}
pass('every raceway is monotonic across trade sizes');

console.log('\nTable 4: wall-thickness ordering at shared trade sizes');
// Pairs that share an outside diameter, so wall thickness alone sets the bore:
// schedule 80 PVC is thicker than schedule 40, and RMC is thicker than IMC.
// EMT is deliberately not compared; it is a different tube with its own
// outside diameter and its bore is smaller than RMC below 2-1/2 in and larger
// above.
const byKey = Object.fromEntries(CONDUIT_TYPES.map((c) => [c.key, c]));
let orderFails = 0;
for (const size of TRADE_SIZES) {
  const p80 = byKey['pvc-80'].internalDiameter[size];
  const p40 = byKey['pvc-40'].internalDiameter[size];
  const rmc = byKey.rmc.internalDiameter[size];
  const imc = byKey.imc.internalDiameter[size];
  if (p80 !== undefined && p40 !== undefined && !(p80 < p40)) { fail(`${size}: PVC 80 bore should be smaller than PVC 40`); orderFails++; }
  if (rmc !== undefined && imc !== undefined && !(rmc < imc)) { fail(`${size}: RMC bore should be smaller than IMC`); orderFails++; }
}
if (!orderFails) pass('wall-thickness ordering holds at every shared trade size');

/* ------------------------------ Table 5 ---------------------------------- */

console.log('\nTable 5: derived area vs published area (tolerance 0.00006 sq in)');
checked = 0;
for (const ins of INSULATION_TYPES) {
  const pub = PUBLISHED_CONDUCTOR[ins.key];
  if (!pub) { fail(`${ins.label}: no independent published record`); continue; }
  for (const size of SIZE_ORDER) {
    const published = pub[size];
    const d = ins.diameter[size];
    if (published === undefined) { fail(`${ins.label} ${size}: no published value recorded`); continue; }
    if (d === undefined) { fail(`${ins.label} ${size}: no diameter in the data file`); continue; }
    const exact = areaFromDiameter(d);
    const shown = conductorArea(ins, size);
    checked += 1;
    if (Math.abs(exact - published) > 0.00006) fail(`${ins.label} ${size}: derived ${exact.toFixed(5)} vs published ${published}`);
    else if (Math.abs(shown - published) > 0.00001) note(`${ins.label} ${size}: book prints ${published.toFixed(4)}, site prints ${shown.toFixed(4)} (exact ${exact.toFixed(5)})`);
  }
}
pass(`${checked} conductor areas reproduce the published figure`);

console.log('\nTable 5: diameter increases with conductor size within each insulation');
for (const ins of INSULATION_TYPES) {
  let prev = 0;
  for (const size of SIZE_ORDER) {
    const d = ins.diameter[size];
    if (d <= prev) fail(`${ins.label}: ${size} (${d}) not larger than the previous size (${prev})`);
    prev = d;
  }
}
pass('every insulation is monotonic across conductor sizes');

console.log('\nTable 5: insulation ordering at every size');
const insBy = Object.fromEntries(INSULATION_TYPES.map((i) => [i.key, i]));
for (const size of SIZE_ORDER) {
  const thhn = insBy.thhn.diameter[size], xhhw = insBy.xhhw.diameter[size];
  const tw = insBy.tw.diameter[size], thw = insBy.thw.diameter[size], rhw = insBy.rhw.diameter[size];
  if (!(tw <= thw)) fail(`${size}: TW (${tw}) should not exceed THW (${thw})`);
  if (!(rhw > thw && rhw > xhhw && rhw > thhn)) fail(`${size}: RHW with covering should be the largest`);
  if (!(thhn <= thw)) fail(`${size}: THHN (${thhn}) should not exceed THW (${thw})`);
}
// TW and THW share dimensions from 6 AWG up; that is a property of the table.
for (const size of SIZE_ORDER.slice(SIZE_ORDER.indexOf('6'))) {
  if (insBy.tw.diameter[size] !== insBy.thw.diameter[size]) fail(`${size}: TW and THW should share a diameter from 6 AWG up`);
}
pass('insulation ordering holds at every size; TW equals THW from 6 AWG up');


/* ======================================================================== *
 * Table 310.16 ampacity and Table 430.250 motor full-load current.
 *
 * These are the two tables on the site whose misuse does the most harm, so
 * they get the same treatment: an independently recorded copy of the
 * published figures compared against the data file, plus the structural
 * properties any correct copy must have.
 * ======================================================================== */

const { AMPACITY_310_16, MOTOR_FLC_3PH, MOTOR_VOLTAGES, STANDARD_OCPD, AWG_SIZES } = await import('../src/data/reference-data.ts');

// Recorded separately from the data file: [60 C, 75 C, 90 C] columns.
const PUBLISHED_310_16 = {
  copper: {
    '14': [15, 20, 25], '12': [20, 25, 30], '10': [30, 35, 40], '8': [40, 50, 55], '6': [55, 65, 75],
    '4': [70, 85, 95], '3': [85, 100, 115], '2': [95, 115, 130], '1': [110, 130, 145],
    '1/0': [125, 150, 170], '2/0': [145, 175, 195], '3/0': [165, 200, 225], '4/0': [195, 230, 260],
    '250 kcmil': [215, 255, 290], '300 kcmil': [240, 285, 320], '350 kcmil': [260, 310, 350],
    '400 kcmil': [280, 335, 380], '500 kcmil': [320, 380, 430], '600 kcmil': [350, 420, 475],
    '750 kcmil': [400, 475, 535], '1000 kcmil': [455, 545, 615],
  },
  aluminum: {
    '14': null, '12': [15, 20, 25], '10': [25, 30, 35], '8': [35, 40, 45], '6': [40, 50, 55],
    '4': [55, 65, 75], '3': [65, 75, 85], '2': [75, 90, 100], '1': [85, 100, 115],
    '1/0': [100, 120, 135], '2/0': [115, 135, 150], '3/0': [130, 155, 175], '4/0': [150, 180, 205],
    '250 kcmil': [170, 205, 230], '300 kcmil': [195, 230, 260], '350 kcmil': [210, 250, 280],
    '400 kcmil': [225, 270, 305], '500 kcmil': [260, 310, 350], '600 kcmil': [285, 340, 385],
    '750 kcmil': [320, 385, 435], '1000 kcmil': [375, 445, 500],
  },
};

// Three-phase induction motors, amperes at 200, 208, 230, 460, 575 V.
const PUBLISHED_430_250 = {
  '0.5': [2.5, 2.4, 2.2, 1.1, 0.9], '0.75': [3.7, 3.5, 3.2, 1.6, 1.3], '1': [4.8, 4.6, 4.2, 2.1, 1.7],
  '1.5': [6.9, 6.6, 6.0, 3.0, 2.4], '2': [7.8, 7.5, 6.8, 3.4, 2.7], '3': [11.0, 10.6, 9.6, 4.8, 3.9],
  '5': [17.5, 16.7, 15.2, 7.6, 6.1], '7.5': [25.3, 24.2, 22, 11, 9], '10': [32.2, 30.8, 28, 14, 11],
  '15': [48.3, 46.2, 42, 21, 17], '20': [62.1, 59.4, 54, 27, 22], '25': [78.2, 74.8, 68, 34, 27],
  '30': [92, 88, 80, 40, 32], '40': [120, 114, 104, 52, 41], '50': [150, 143, 130, 65, 52],
  '60': [177, 169, 154, 77, 62], '75': [221, 211, 192, 96, 77], '100': [285, 273, 248, 124, 99],
  '125': [359, 343, 312, 156, 125], '150': [414, 396, 360, 180, 144], '200': [552, 528, 480, 240, 192],
};

// 240.6(A) standard ampere ratings.
const PUBLISHED_240_6 = [15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200, 225, 250, 300, 350, 400, 450, 500, 600, 700, 800, 1000, 1200, 1600, 2000, 2500, 3000, 4000, 5000, 6000];

console.log('\nTable 310.16: data file vs published');
let ampChecked = 0, ampFails = 0;
for (const material of ['copper', 'aluminum']) {
  const pub = PUBLISHED_310_16[material];
  const data = AMPACITY_310_16[material];
  for (const [size, expected] of Object.entries(pub)) {
    const got = data[size];
    if (expected === null) {
      if (got !== null && got !== undefined) { fail(`310.16 ${material} ${size}: should be absent, data has ${JSON.stringify(got)}`); ampFails++; }
      continue;
    }
    if (!got) { fail(`310.16 ${material} ${size}: missing from data file`); ampFails++; continue; }
    ampChecked++;
    if (got.join(',') !== expected.join(',')) { fail(`310.16 ${material} ${size}: data ${got.join('/')} vs published ${expected.join('/')}`); ampFails++; }
  }
  for (const size of Object.keys(data)) {
    if (!(size in pub)) { fail(`310.16 ${material} ${size}: in data file but no published row recorded`); ampFails++; }
  }
}
if (!ampFails) pass(`${ampChecked} ampacity rows match the published table`);

console.log('\nTable 310.16: structure');
let structFails = 0;
const sizeOrder = AWG_SIZES.map((s) => s.label);
for (const material of ['copper', 'aluminum']) {
  let prev = [0, 0, 0];
  for (const size of sizeOrder) {
    const row = AMPACITY_310_16[material][size];
    if (!row) continue;
    if (!(row[0] <= row[1] && row[1] <= row[2])) { fail(`310.16 ${material} ${size}: columns should rise 60 <= 75 <= 90, got ${row.join('/')}`); structFails++; }
    if (!(row[0] >= prev[0] && row[1] >= prev[1] && row[2] >= prev[2])) { fail(`310.16 ${material} ${size}: ampacity fell below the previous size`); structFails++; }
    prev = row;
  }
}
for (const size of sizeOrder) {
  const cu = AMPACITY_310_16.copper[size], al = AMPACITY_310_16.aluminum[size];
  if (cu && al && !(cu[0] > al[0] && cu[1] > al[1] && cu[2] > al[2])) { fail(`310.16 ${size}: copper should exceed aluminum in every column`); structFails++; }
}
if (!structFails) pass('columns rise with temperature and size; copper exceeds aluminum at every size');

console.log('\nTable 430.250: data file vs published');
let flcChecked = 0, flcFails = 0;
if (MOTOR_VOLTAGES.join(',') !== '200,208,230,460,575') { fail(`430.250: voltage columns are ${MOTOR_VOLTAGES.join(',')}, expected 200,208,230,460,575`); flcFails++; }
for (const [hp, expected] of Object.entries(PUBLISHED_430_250)) {
  const got = MOTOR_FLC_3PH[hp];
  if (!got) { fail(`430.250 ${hp} hp: missing from data file`); flcFails++; continue; }
  flcChecked++;
  if (got.join(',') !== expected.join(',')) { fail(`430.250 ${hp} hp: data ${got.join('/')} vs published ${expected.join('/')}`); flcFails++; }
}
for (const hp of Object.keys(MOTOR_FLC_3PH)) {
  if (!(hp in PUBLISHED_430_250)) { fail(`430.250 ${hp} hp: in data file but no published row recorded`); flcFails++; }
}
if (!flcFails) pass(`${flcChecked} motor full-load current rows match the published table`);

console.log('\nTable 430.250: structure');
structFails = 0;
const hpOrder = Object.keys(PUBLISHED_430_250);
let prevRow = [0, 0, 0, 0, 0];
for (const hp of hpOrder) {
  const row = MOTOR_FLC_3PH[hp];
  if (!row) continue;
  // Current falls as voltage rises across the row, and rises with horsepower down the column.
  for (let i = 1; i < row.length; i++) if (!(row[i] < row[i - 1])) { fail(`430.250 ${hp} hp: current should fall as voltage rises, got ${row.join('/')}`); structFails++; }
  for (let i = 0; i < row.length; i++) if (!(row[i] > prevRow[i])) { fail(`430.250 ${hp} hp: current should rise with horsepower in column ${i}`); structFails++; }
  // 460 V draws half of 230 V for the same motor; the table rounds, so allow 6%.
  const ratio = row[2] / row[3];
  if (Math.abs(ratio - 2) > 0.12) { fail(`430.250 ${hp} hp: 230 V / 460 V ratio ${ratio.toFixed(2)}, expected about 2`); structFails++; }
  prevRow = row;
}
if (!structFails) pass('current falls with voltage, rises with horsepower, and 230 V draws about twice 460 V');

console.log('\n240.6(A): standard ampere ratings');
if (STANDARD_OCPD.join(',') !== PUBLISHED_240_6.join(',')) fail(`240.6(A): data ${STANDARD_OCPD.join(',')} vs published ${PUBLISHED_240_6.join(',')}`);
else pass(`${STANDARD_OCPD.length} standard ratings match`);

console.log('');
if (failures) { console.error(`${failures} FAILED`); process.exit(1); }
console.log('all electrical table checks passed');
