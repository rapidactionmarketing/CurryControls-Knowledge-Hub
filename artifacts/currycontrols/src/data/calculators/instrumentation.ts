import { fmt, num, pct, sig, str, type Calculator } from '../calc-types';

/** IEC 60751 Callendar-Van Dusen coefficients for a platinum RTD. */
const CVD = { A: 3.9083e-3, B: -5.775e-7, C: -4.183e-12 };

export const INSTRUMENTATION_CALCULATORS: Calculator[] = [
  {
    slug: '4-20-ma-scaling',
    title: '4-20 mA Scaling Calculator',
    category: 'Instrumentation',
    summary:
      'Convert between milliamps, percent of span, and engineering units for a 4-20 mA loop, in either direction, with NAMUR fault thresholds shown.',
    answer:
      'To convert a 4-20 mA signal to engineering units, subtract 4 from the measured current, divide by 16 to get the fraction of span, multiply by the calibrated span, then add the lower range value. To go the other way, take the fraction of span and multiply by 16 before adding 4.',
    keywords: ['4-20 mA', 'scaling', 'engineering units', 'percent of span', 'loop'],
    fields: [
      {
        kind: 'select',
        key: 'direction',
        label: 'Convert',
        options: [
          { value: 'ma-to-eu', label: 'Milliamps to engineering units' },
          { value: 'eu-to-ma', label: 'Engineering units to milliamps' },
          { value: 'pct-to-ma', label: 'Percent of span to milliamps' },
        ],
        default: 'ma-to-eu',
      },
      { kind: 'number', key: 'input', label: 'Value to convert', default: 12, step: 0.001 },
      { kind: 'number', key: 'euMin', label: 'Lower range value (at 4 mA)', default: 0, step: 0.01 },
      { kind: 'number', key: 'euMax', label: 'Upper range value (at 20 mA)', default: 25, step: 0.01 },
      { kind: 'text', key: 'unit', label: 'Engineering unit', default: 'ft', placeholder: 'ft, psi, gpm' },
    ],
    run: (v) => {
      const direction = str(v.direction, 'ma-to-eu');
      const input = num(v.input);
      const euMin = num(v.euMin, 0);
      const euMax = num(v.euMax, 100);
      const unit = str(v.unit, '');

      if (euMax === euMin) return { outputs: [], error: 'The upper and lower range values cannot be the same.' };

      const span = euMax - euMin;
      let ma = 0;
      let eu = 0;
      let fraction = 0;
      const steps: string[] = [];

      if (direction === 'ma-to-eu') {
        ma = input;
        fraction = (ma - 4) / 16;
        eu = fraction * span + euMin;
        steps.push(`Fraction of span = (${fmt(ma, 3)} mA - 4) / 16 = ${fmt(fraction, 5)}`);
        steps.push(`EU = ${fmt(fraction, 5)} x ${fmt(span, 3)} + ${fmt(euMin, 3)} = ${fmt(eu, 3)} ${unit}`);
      } else if (direction === 'eu-to-ma') {
        eu = input;
        fraction = (eu - euMin) / span;
        ma = fraction * 16 + 4;
        steps.push(`Fraction of span = (${fmt(eu, 3)} - ${fmt(euMin, 3)}) / ${fmt(span, 3)} = ${fmt(fraction, 5)}`);
        steps.push(`mA = ${fmt(fraction, 5)} x 16 + 4 = ${fmt(ma, 4)} mA`);
      } else {
        fraction = input / 100;
        ma = fraction * 16 + 4;
        eu = fraction * span + euMin;
        steps.push(`Fraction of span = ${fmt(input, 3)}% / 100 = ${fmt(fraction, 5)}`);
        steps.push(`mA = ${fmt(fraction, 5)} x 16 + 4 = ${fmt(ma, 4)} mA`);
      }

      const percentOfSpan = fraction * 100;
      const outOfRange = ma < 3.6 || ma > 21;
      const belowZero = ma >= 3.6 && ma < 4;
      const aboveFull = ma > 20 && ma <= 21;

      return {
        outputs: [
          { label: 'Current', value: fmt(ma, 4), unit: 'mA', emphasis: true },
          {
            label: 'Engineering value',
            value: fmt(eu, 3),
            unit: unit || undefined,
            emphasis: true,
          },
          { label: 'Percent of span', value: pct(percentOfSpan, 2) },
          { label: 'Voltage across a 250 ohm input', value: fmt((ma / 1000) * 250, 4), unit: 'V' },
          {
            label: 'Signal status',
            value: outOfRange
              ? 'Outside the measuring range'
              : belowZero || aboveFull
                ? 'Slightly outside 4-20 mA'
                : 'Within 4-20 mA',
            status: outOfRange ? 'over' : belowZero || aboveFull ? 'caution' : 'ok',
            note: outOfRange
              ? 'Under NAMUR NE 43, below 3.6 mA or above 21 mA indicates a device fault rather than a process value.'
              : undefined,
          },
        ],
        steps,
        warnings: [
          'A reading below 3.6 mA or above 21 mA is a fault indication under NAMUR NE 43, not a measurement. Logic that scales it into a plausible engineering value will act on bad data.',
          'The transmitter calibrated range, the analog card range configuration, and the scaling constants in the program must all describe the same thing. Nearly every scaling problem is a mismatch between those three.',
          'This assumes a linear transmitter. Differential pressure flow requires square root extraction, applied exactly once.',
        ],
      };
    },
    formulas: [
      { expr: 'EU = ((mA - 4) / 16) x (EU_max - EU_min) + EU_min' },
      { expr: 'mA = ((EU - EU_min) / (EU_max - EU_min)) x 16 + 4' },
    ],
    assumptions: [
      'Linear 4-20 mA transmitter with 4 mA at the lower range value and 20 mA at the upper.',
      'Does not apply square root extraction.',
      'Does not model transmitter or input card accuracy.',
    ],
    standards: ['NAMUR NE 43 for out-of-range fault signalling'],
    related: ['/controls/plc-systems/analog-control/4-20-ma', '/controls/plc-systems/analog-control/scaling'],
    relatedCalculators: ['analog-raw-counts', 'loop-resistance', 'square-root-extraction'],
    faqs: [
      {
        q: 'What is 12 mA in engineering units?',
        a: 'Exactly the midpoint of the calibrated range. Checking at 12 mA is the fastest way to catch a span error, and it is the check people skip.',
      },
      {
        q: 'Why is the bottom of the range 4 mA and not 0?',
        a: 'So a genuine zero measurement is distinguishable from a broken circuit. At 4 mA the loop is proven intact; 0 mA means something is open.',
      },
    ],
  },

  {
    slug: 'analog-raw-counts',
    title: 'Analog Raw Counts to Engineering Units',
    category: 'Instrumentation',
    summary:
      'Convert between the raw integer an analog input card reports and the engineering value, in either direction, with the resolution per count.',
    answer:
      'Scaling a raw analog count to engineering units is a linear map: subtract the count at 4 mA, divide by the count span, multiply by the engineering span, and add the lower range value. The raw count range is specific to the module and must be read from its manual, then confirmed by injecting a known current.',
    keywords: ['raw counts', 'analog scaling', 'PLC', 'engineering units', 'resolution'],
    fields: [
      {
        kind: 'select',
        key: 'direction',
        label: 'Convert',
        options: [
          { value: 'raw-to-eu', label: 'Raw counts to engineering units' },
          { value: 'eu-to-raw', label: 'Engineering units to raw counts' },
        ],
        default: 'raw-to-eu',
      },
      { kind: 'number', key: 'input', label: 'Value to convert', default: 16384, step: 1 },
      { kind: 'number', key: 'rawMin', label: 'Raw count at 4 mA', default: 0, step: 1 },
      { kind: 'number', key: 'rawMax', label: 'Raw count at 20 mA', default: 32767, step: 1 },
      { kind: 'number', key: 'euMin', label: 'Engineering value at 4 mA', default: 0, step: 0.01 },
      { kind: 'number', key: 'euMax', label: 'Engineering value at 20 mA', default: 25, step: 0.01 },
      { kind: 'text', key: 'unit', label: 'Engineering unit', default: 'ft', placeholder: 'ft, psi, gpm' },
    ],
    run: (v) => {
      const direction = str(v.direction, 'raw-to-eu');
      const input = num(v.input);
      const rawMin = num(v.rawMin, 0);
      const rawMax = num(v.rawMax, 32767);
      const euMin = num(v.euMin, 0);
      const euMax = num(v.euMax, 100);
      const unit = str(v.unit, '');

      if (rawMax === rawMin) return { outputs: [], error: 'The raw count endpoints cannot be the same.' };
      if (euMax === euMin) return { outputs: [], error: 'The engineering endpoints cannot be the same.' };

      const rawSpan = rawMax - rawMin;
      const euSpan = euMax - euMin;

      let raw = 0;
      let eu = 0;
      const steps: string[] = [];

      if (direction === 'raw-to-eu') {
        raw = input;
        eu = ((raw - rawMin) / rawSpan) * euSpan + euMin;
        steps.push(`EU = ((${fmt(raw, 0)} - ${fmt(rawMin, 0)}) / ${fmt(rawSpan, 0)}) x ${fmt(euSpan, 3)} + ${fmt(euMin, 3)}`);
        steps.push(`EU = ${fmt(eu, 4)} ${unit}`);
      } else {
        eu = input;
        raw = ((eu - euMin) / euSpan) * rawSpan + rawMin;
        steps.push(`Raw = ((${fmt(eu, 3)} - ${fmt(euMin, 3)}) / ${fmt(euSpan, 3)}) x ${fmt(rawSpan, 0)} + ${fmt(rawMin, 0)}`);
        steps.push(`Raw = ${fmt(raw, 1)} counts`);
      }

      const fraction = (raw - rawMin) / rawSpan;
      const ma = fraction * 16 + 4;
      const resolution = Math.abs(euSpan / rawSpan);

      return {
        outputs: [
          { label: 'Raw count', value: fmt(raw, 1), emphasis: true },
          { label: 'Engineering value', value: fmt(eu, 4), unit: unit || undefined, emphasis: true },
          { label: 'Percent of span', value: pct(fraction * 100, 2) },
          { label: 'Equivalent current', value: fmt(ma, 4), unit: 'mA' },
          {
            label: 'Resolution per count',
            value: sig(resolution, 4),
            unit: unit || undefined,
            note: 'The smallest change the card can represent. Filtering below this is meaningless.',
          },
          {
            label: 'Within the configured range',
            value: raw >= Math.min(rawMin, rawMax) && raw <= Math.max(rawMin, rawMax) ? 'Yes' : 'No',
            status: raw >= Math.min(rawMin, rawMax) && raw <= Math.max(rawMin, rawMax) ? 'ok' : 'over',
          },
        ],
        steps,
        warnings: [
          'There is no universal raw count range. Read it from the module manual, then confirm it by injecting 4 mA and 20 mA and observing the value online.',
          'If the channel is configured for 0-20 mA but the loop is a 4-20 mA transmitter, the reading is 25% high at zero and the error shrinks toward full scale, which looks like calibration drift rather than a configuration error.',
          'Clamp the scaled result and flag out-of-range raw values separately. Without clamping, a fault current produces a physically impossible engineering value that downstream logic will act on.',
        ],
      };
    },
    formulas: [
      { expr: 'EU = ((Raw - Raw_min) / (Raw_max - Raw_min)) x (EU_max - EU_min) + EU_min' },
    ],
    assumptions: [
      'Linear analog input with the endpoints you enter.',
      'Does not model card accuracy, linearity error, or drift.',
    ],
    related: ['/controls/plc-systems/analog-control/scaling', '/how-to/plc-how-to/scale-a-4-20-ma-input'],
    relatedCalculators: ['4-20-ma-scaling', 'analog-resolution'],
    faqs: [
      {
        q: 'What raw value corresponds to 4 mA on my card?',
        a: 'It depends entirely on the module and its configuration. Read the manual and then verify by injection. Assuming a value is the most common cause of a scaling error.',
      },
    ],
  },

  {
    slug: 'loop-resistance',
    title: '4-20 mA Loop Resistance Budget',
    category: 'Instrumentation',
    summary:
      'Maximum loop resistance a two-wire transmitter can drive from a given supply voltage, and whether the loop you have described has enough headroom.',
    answer:
      'Maximum loop resistance equals the supply voltage minus the transmitter minimum operating voltage, divided by 0.020 amperes. Full scale is the worst case because the voltage burden is highest there. Running out of headroom produces a loop that tracks correctly at low readings and clips or goes nonlinear near full scale.',
    keywords: ['loop resistance', 'compliance voltage', '4-20 mA', 'burden', 'loop power'],
    fields: [
      { kind: 'number', key: 'supply', label: 'Loop supply voltage', unit: 'V', default: 24, min: 1 },
      { kind: 'number', key: 'compliance', label: 'Transmitter minimum operating voltage', unit: 'V', default: 11, min: 0, help: 'From the transmitter datasheet. Often 10 to 12 V.' },
      { kind: 'number', key: 'inputR', label: 'Receiving input resistance', unit: 'ohm', default: 250, min: 0 },
      { kind: 'number', key: 'extraR', label: 'Other devices in the loop', unit: 'ohm', default: 0, min: 0, help: 'Panel indicators, isolators, barriers, additional inputs in series.' },
      { kind: 'number', key: 'wireLength', label: 'One-way wire length', unit: 'ft', default: 500, min: 0 },
      {
        kind: 'number',
        key: 'wireR',
        label: 'Wire resistance',
        unit: 'ohm per 1000 ft',
        default: 6.4,
        min: 0,
        step: 0.1,
        help: 'About 6.4 for 18 AWG copper and 10.2 for 20 AWG. Use the cable datasheet where you have it.',
      },
    ],
    run: (v) => {
      const supply = num(v.supply, 24);
      const compliance = num(v.compliance, 11);
      const inputR = num(v.inputR, 250);
      const extraR = num(v.extraR, 0);
      const wireLength = num(v.wireLength, 0);
      const wireR = num(v.wireR, 6.4);

      if (supply <= compliance) {
        return { outputs: [], error: 'The supply voltage must be higher than the transmitter minimum operating voltage.' };
      }

      const available = supply - compliance;
      const maxR = available / 0.02;
      // Both conductors carry the loop current, so the wire run counts twice.
      const wireResistance = (wireLength * 2 * wireR) / 1000;
      const totalR = inputR + extraR + wireResistance;
      const margin = maxR - totalR;
      const ok = margin >= 0;

      const burdenAt20 = totalR * 0.02;
      const transmitterVolts = supply - burdenAt20;

      return {
        outputs: [
          { label: 'Maximum loop resistance', value: fmt(maxR, 0), unit: 'ohm', emphasis: true },
          {
            label: 'Actual loop resistance',
            value: fmt(totalR, 1),
            unit: 'ohm',
            emphasis: true,
            status: ok ? 'ok' : 'over',
          },
          {
            label: 'Headroom',
            value: fmt(margin, 1),
            unit: 'ohm',
            status: ok ? (margin < maxR * 0.2 ? 'caution' : 'ok') : 'over',
            note: ok
              ? margin < maxR * 0.2
                ? 'Thin margin. Adding an indicator or a longer run will exceed it.'
                : 'Comfortable margin.'
              : 'The loop cannot reach 20 mA. Expect clipping near full scale.',
          },
          { label: 'Wire resistance in the loop', value: fmt(wireResistance, 2), unit: 'ohm', note: `${fmt(wireLength, 0)} ft, both conductors` },
          { label: 'Burden at 20 mA', value: fmt(burdenAt20, 2), unit: 'V' },
          {
            label: 'Voltage left at the transmitter',
            value: fmt(transmitterVolts, 2),
            unit: 'V',
            status: transmitterVolts >= compliance ? 'ok' : 'over',
          },
          {
            label: 'HART capable',
            value: totalR >= 230 ? 'Yes, at least 230 ohm present' : 'No, below about 230 ohm',
            status: totalR >= 230 ? 'ok' : 'caution',
            note: 'HART communication generally needs a minimum loop resistance of about 230 ohm.',
          },
        ],
        steps: [
          `Available voltage = ${fmt(supply, 1)} V - ${fmt(compliance, 1)} V = ${fmt(available, 1)} V`,
          `Maximum resistance = ${fmt(available, 1)} V / 0.020 A = ${fmt(maxR, 0)} ohm`,
          `Wire = ${fmt(wireLength, 0)} ft x 2 conductors x ${fmt(wireR, 2)} ohm/1000 ft = ${fmt(wireResistance, 2)} ohm`,
          `Total = ${fmt(inputR, 0)} input + ${fmt(extraR, 0)} other + ${fmt(wireResistance, 2)} wire = ${fmt(totalR, 1)} ohm`,
        ],
        warnings: [
          'Full scale is the worst case. A loop with marginal headroom reads correctly at low values and misbehaves as the signal rises, which makes the fault look like a process problem.',
          'Intrinsic safety barriers and isolators add significant resistance. Include every series device.',
          'Immunity to wire resistance is not immunity to noise. Cable routing, shielding, and single-point shield grounding still matter.',
        ],
      };
    },
    formulas: [
      {
        expr: 'R_max = (V_supply - V_transmitter_min) / 0.020',
        where: ['0.020 A — full scale, where the voltage burden is highest'],
      },
    ],
    assumptions: [
      'Two-wire loop-powered transmitter.',
      'Default wire resistance figures are for copper at room temperature. Resistance rises with temperature.',
      'Both conductors of the run are counted.',
    ],
    related: ['/controls/plc-systems/analog-control/4-20-ma', '/how-to/instrumentation-how-to/test-a-4-20-ma-loop'],
    relatedCalculators: ['4-20-ma-scaling', 'voltage-drop'],
    faqs: [
      {
        q: 'What is the maximum distance for a 4-20 mA signal?',
        a: 'Distance is limited by total loop resistance, not by a fixed length. Work out the available voltage, divide by 0.020 amperes, subtract the receiver and every series device, and the remainder is the wire budget. Several thousand feet of ordinary instrument cable is routinely fine.',
      },
    ],
  },

  {
    slug: 'square-root-extraction',
    title: 'Differential Pressure Flow and Square Root Extraction',
    category: 'Instrumentation',
    summary:
      'Flow from a differential pressure signal with square root extraction, including the low-flow cutoff and the resolution penalty near zero.',
    answer:
      'Differential pressure flow measurement produces a signal proportional to the square of flow, so flow is the square root of the normalized differential multiplied by the full-scale flow. Applying extraction twice, once in the transmitter and again in the controller, gives a reading that is wrong everywhere except at zero and full scale.',
    keywords: ['square root', 'differential pressure', 'DP flow', 'orifice', 'low flow cutoff'],
    fields: [
      { kind: 'number', key: 'ma', label: 'Transmitter output', unit: 'mA', default: 12, min: 3, max: 22, step: 0.01 },
      { kind: 'number', key: 'flowMax', label: 'Flow at full scale', default: 1000, min: 0.001 },
      { kind: 'text', key: 'unit', label: 'Flow unit', default: 'gpm', placeholder: 'gpm, MGD, cfs' },
      { kind: 'number', key: 'cutoff', label: 'Low flow cutoff', unit: '% of span', default: 5, min: 0, max: 25, step: 0.5 },
      {
        kind: 'select',
        key: 'where',
        label: 'Where extraction happens',
        options: [
          { value: 'plc', label: 'Transmitter linear, controller extracts' },
          { value: 'transmitter', label: 'Transmitter extracts, controller linear' },
          { value: 'both', label: 'Both extract (this is the error case)' },
        ],
        default: 'plc',
      },
    ],
    run: (v) => {
      const ma = num(v.ma, 12);
      const flowMax = num(v.flowMax, 100);
      const unit = str(v.unit, 'gpm');
      const cutoff = num(v.cutoff, 5) / 100;
      const where = str(v.where, 'plc');

      const fraction = Math.max(0, Math.min(1.05, (ma - 4) / 16));

      let flowFraction: number;
      const steps: string[] = [`Normalized signal = (${fmt(ma, 3)} mA - 4) / 16 = ${fmt(fraction, 5)}`];

      if (where === 'both') {
        flowFraction = Math.sqrt(Math.sqrt(fraction));
        steps.push(`Extraction applied twice: sqrt(sqrt(${fmt(fraction, 5)})) = ${fmt(flowFraction, 5)}`);
      } else {
        flowFraction = Math.sqrt(fraction);
        steps.push(`Flow fraction = sqrt(${fmt(fraction, 5)}) = ${fmt(flowFraction, 5)}`);
      }

      const belowCutoff = flowFraction < cutoff;
      const flow = belowCutoff ? 0 : flowFraction * flowMax;
      const correctFlow = Math.sqrt(fraction) * flowMax;

      steps.push(`Flow = ${fmt(flowFraction, 5)} x ${fmt(flowMax, 2)} = ${fmt(flowFraction * flowMax, 3)} ${unit}`);
      if (belowCutoff) steps.push(`Below the ${pct(cutoff * 100, 1)} cutoff, so flow is forced to zero`);

      // Sensitivity: how much flow one percent of signal represents at this point.
      const sensitivity =
        fraction > 0 ? (Math.sqrt(Math.min(1, fraction + 0.01)) - Math.sqrt(fraction)) * flowMax : flowMax * 0.1;

      return {
        outputs: [
          { label: 'Flow', value: fmt(flow, 3), unit, emphasis: true, note: belowCutoff ? 'Forced to zero by the low flow cutoff' : undefined },
          { label: 'Percent of full scale flow', value: pct(flowFraction * 100, 2) },
          { label: 'Differential as percent of DP span', value: pct(fraction * 100, 2) },
          ...(where === 'both'
            ? [
                {
                  label: 'Flow if extraction were applied once',
                  value: fmt(correctFlow, 3),
                  unit,
                  status: 'over' as const,
                  note: 'Double extraction is a real and common configuration error.',
                },
              ]
            : []),
          {
            label: 'Flow change per 1% of signal here',
            value: fmt(sensitivity, 3),
            unit,
            status: fraction < 0.05 ? 'caution' : 'neutral',
            note:
              fraction < 0.05
                ? 'Near zero, a tiny differential becomes a large fraction of flow. This is why a low flow cutoff is necessary.'
                : undefined,
          },
        ],
        steps,
        warnings: [
          'Decide where extraction happens, write it on the loop sheet, and verify at 50% of flow. Applying it twice is wrong everywhere except at zero and full scale, which is exactly where people check.',
          'Square root extraction amplifies noise badly near zero. Without a low flow cutoff, a still pipe reports a wandering trickle and the totalizer accumulates flow that never happened.',
          'Differential pressure flow accuracy depends on the primary element, the straight run, the fluid density, and the impulse lines. This calculation covers only the signal relationship.',
          ...(where === 'both' ? ['You selected the double-extraction case, which is a configuration error rather than a valid setup.'] : []),
        ],
      };
    },
    formulas: [
      { expr: 'Flow = sqrt((mA - 4) / 16) x Flow_full_scale' },
    ],
    assumptions: [
      'Ideal square-law relationship between differential pressure and flow.',
      'Ignores fluid density compensation, which matters on gas and steam.',
      'Ignores primary element discharge coefficient and installation effects.',
    ],
    related: ['/controls/plc-systems/analog-control/scaling', '/controls/instrumentation/flow/differential-pressure-flow'],
    relatedCalculators: ['4-20-ma-scaling', 'analog-raw-counts'],
    faqs: [
      {
        q: 'How do I tell whether extraction is already happening in the transmitter?',
        a: 'Check the transmitter configuration, with a HART communicator if it has one. Then verify at 50% of flow: if the reading is about 25% of full scale, extraction is being applied twice.',
      },
    ],
  },

  {
    slug: 'analog-resolution',
    title: 'Analog Input Resolution',
    category: 'Instrumentation',
    summary:
      'Resolution in engineering units per count for an analog input, from converter bit depth and calibrated range, with the smallest meaningful change.',
    answer:
      'Analog resolution is the calibrated engineering span divided by the number of counts across that span. A 16-bit converter has 65,536 total counts, but a 4-20 mA input uses only the portion of the range representing 4 to 20 mA, so the usable resolution is coarser than the bit depth alone suggests.',
    keywords: ['resolution', 'bits', 'analog input', 'ADC', 'counts'],
    fields: [
      {
        kind: 'select',
        key: 'bits',
        label: 'Converter resolution',
        options: [
          { value: '12', label: '12 bit (4096 counts)' },
          { value: '13', label: '13 bit (8192 counts)' },
          { value: '14', label: '14 bit (16384 counts)' },
          { value: '15', label: '15 bit (32768 counts)' },
          { value: '16', label: '16 bit (65536 counts)' },
        ],
        default: '16',
      },
      {
        kind: 'select',
        key: 'usable',
        label: 'How much of the converter range 4-20 mA occupies',
        options: [
          { value: '1', label: 'All of it (card scaled 4-20 mA to full count range)' },
          { value: '0.8', label: '80% (card spans 0-20 mA)' },
          { value: '0.5', label: '50% (card spans a wider input range)' },
        ],
        default: '1',
      },
      { kind: 'number', key: 'euMin', label: 'Engineering value at 4 mA', default: 0, step: 0.01 },
      { kind: 'number', key: 'euMax', label: 'Engineering value at 20 mA', default: 25, step: 0.01 },
      { kind: 'text', key: 'unit', label: 'Engineering unit', default: 'ft' },
    ],
    run: (v) => {
      const bits = Number(str(v.bits, '16'));
      const usable = Number(str(v.usable, '1'));
      const euMin = num(v.euMin, 0);
      const euMax = num(v.euMax, 100);
      const unit = str(v.unit, '');

      const span = Math.abs(euMax - euMin);
      if (span === 0) return { outputs: [], error: 'The engineering range cannot be zero.' };

      const totalCounts = 2 ** bits;
      const usableCounts = totalCounts * usable;
      const resolution = span / usableCounts;
      const maResolution = 16 / usableCounts;
      const percentResolution = 100 / usableCounts;

      return {
        outputs: [
          { label: 'Resolution', value: sig(resolution, 4), unit: unit ? `${unit} per count` : 'per count', emphasis: true },
          { label: 'Usable counts across 4-20 mA', value: fmt(usableCounts, 0), emphasis: true },
          { label: 'Resolution in current', value: sig(maResolution * 1000, 3), unit: 'microamps per count' },
          { label: 'Resolution as percent of span', value: `${sig(percentResolution, 3)}%` },
          { label: 'Total converter counts', value: fmt(totalCounts, 0), note: `${bits} bit` },
          {
            label: 'Smallest meaningful display step',
            value: sig(resolution * 2, 4),
            unit: unit || undefined,
            note: 'Displaying more precision than about two counts shows converter noise rather than process change.',
          },
        ],
        steps: [
          `Total counts = 2 ^ ${bits} = ${fmt(totalCounts, 0)}`,
          `Counts across 4-20 mA = ${fmt(totalCounts, 0)} x ${fmt(usable, 2)} = ${fmt(usableCounts, 0)}`,
          `Resolution = ${fmt(span, 3)} ${unit} / ${fmt(usableCounts, 0)} counts = ${sig(resolution, 4)} ${unit} per count`,
        ],
        warnings: [
          'Resolution is not accuracy. A 16-bit card can still be several counts off due to gain error, offset, linearity, and drift. Check the module accuracy specification.',
          'Displaying more decimal places than the resolution supports invents precision that is not there, and it makes operators chase noise.',
          'Filtering below the resolution accomplishes nothing. If a value is stepping by one count, the process is not moving.',
        ],
      };
    },
    formulas: [{ expr: 'Resolution = engineering span / usable counts' }],
    assumptions: [
      'Ideal converter with no gain, offset, or linearity error.',
      'The usable fraction depends on how the module maps its input range onto its count range.',
    ],
    related: ['/controls/plc-systems/analog-control/raw-counts'],
    relatedCalculators: ['analog-raw-counts', '4-20-ma-scaling'],
    faqs: [
      {
        q: 'Is a 16-bit card four times better than a 14-bit card?',
        a: 'In resolution, yes. In accuracy, often not, because accuracy is dominated by gain, offset, linearity, and temperature drift rather than by the converter step size. Read the accuracy specification, not just the bit depth.',
      },
    ],
  },

  {
    slug: 'rtd-temperature',
    title: 'RTD Resistance and Temperature',
    category: 'Instrumentation',
    summary:
      'Convert between platinum RTD resistance and temperature using the IEC 60751 Callendar-Van Dusen relationship, with lead resistance error shown.',
    answer:
      'A platinum RTD follows the Callendar-Van Dusen equation: above 0 degrees C, resistance equals R0 multiplied by 1 plus A times temperature plus B times temperature squared, with A of 3.9083e-3 and B of -5.775e-7 for a standard 385 alpha sensor. A Pt100 reads 100 ohms at 0 degrees C and about 138.5 ohms at 100 degrees C.',
    keywords: ['RTD', 'Pt100', 'temperature', 'resistance', 'Callendar-Van Dusen', 'IEC 60751'],
    fields: [
      {
        kind: 'select',
        key: 'direction',
        label: 'Convert',
        options: [
          { value: 'r-to-t', label: 'Resistance to temperature' },
          { value: 't-to-r', label: 'Temperature to resistance' },
        ],
        default: 'r-to-t',
      },
      { kind: 'number', key: 'input', label: 'Value to convert', default: 138.51, step: 0.01 },
      {
        kind: 'select',
        key: 'r0',
        label: 'Sensor type',
        options: [
          { value: '100', label: 'Pt100 (100 ohm at 0 C)' },
          { value: '1000', label: 'Pt1000 (1000 ohm at 0 C)' },
          { value: '500', label: 'Pt500 (500 ohm at 0 C)' },
        ],
        default: '100',
      },
      { kind: 'number', key: 'leadR', label: 'Lead resistance per conductor', unit: 'ohm', default: 0, min: 0, step: 0.01, help: 'Only affects a two-wire connection. Three- and four-wire connections compensate for it.' },
      {
        kind: 'select',
        key: 'wiring',
        label: 'Wiring',
        options: [
          { value: '2', label: 'Two wire (no compensation)' },
          { value: '3', label: 'Three wire (compensated)' },
          { value: '4', label: 'Four wire (fully compensated)' },
        ],
        default: '3',
      },
    ],
    run: (v) => {
      const direction = str(v.direction, 'r-to-t');
      const input = num(v.input);
      const r0 = Number(str(v.r0, '100'));
      const leadR = num(v.leadR, 0);
      const wiring = str(v.wiring, '3');

      const resistanceAt = (t: number): number => {
        if (t >= 0) return r0 * (1 + CVD.A * t + CVD.B * t * t);
        return r0 * (1 + CVD.A * t + CVD.B * t * t + CVD.C * (t - 100) * t * t * t);
      };

      const temperatureAt = (r: number): number => {
        // Closed form above 0 C; iterate below it because of the cubic term.
        const above = (-CVD.A + Math.sqrt(CVD.A * CVD.A - 4 * CVD.B * (1 - r / r0))) / (2 * CVD.B);
        if (above >= 0) return above;
        let t = -50;
        for (let i = 0; i < 60; i += 1) {
          const err = resistanceAt(t) - r;
          const slope = (resistanceAt(t + 0.01) - resistanceAt(t - 0.01)) / 0.02;
          t -= err / slope;
        }
        return t;
      };

      let resistance: number;
      let temperature: number;
      const steps: string[] = [];

      if (direction === 'r-to-t') {
        resistance = input;
        temperature = temperatureAt(resistance);
        steps.push(`Solving R = R0 (1 + A t + B t squared) for t with R0 = ${r0} ohm`);
        steps.push(`t = ${fmt(temperature, 3)} C`);
      } else {
        temperature = input;
        resistance = resistanceAt(temperature);
        steps.push(`R = ${r0} x (1 + ${CVD.A} x ${fmt(temperature, 2)} + ${CVD.B} x ${fmt(temperature, 2)} squared)`);
        steps.push(`R = ${fmt(resistance, 4)} ohm`);
      }

      if (!Number.isFinite(temperature) || !Number.isFinite(resistance)) {
        return { outputs: [], error: 'That value is outside the range this relationship covers.' };
      }

      // A two-wire connection adds both lead conductors into the measurement.
      const leadError = wiring === '2' ? leadR * 2 : 0;
      const apparentR = resistance + leadError;
      const apparentT = temperatureAt(apparentR);
      const errorC = apparentT - temperature;

      return {
        outputs: [
          { label: 'Temperature', value: fmt(temperature, 2), unit: 'C', emphasis: true },
          { label: 'Temperature', value: fmt(temperature * 1.8 + 32, 2), unit: 'F' },
          { label: 'Resistance', value: fmt(resistance, 4), unit: 'ohm', emphasis: true },
          ...(wiring === '2' && leadR > 0
            ? [
                {
                  label: 'Reading with lead resistance',
                  value: fmt(apparentT, 2),
                  unit: 'C',
                  status: 'over' as const,
                  note: `Two-wire connection adds ${fmt(leadError, 3)} ohm and reads ${fmt(errorC, 2)} C high`,
                },
                { label: 'Lead resistance error', value: fmt(errorC, 3), unit: 'C', status: 'caution' as const },
              ]
            : [
                {
                  label: 'Lead compensation',
                  value: wiring === '4' ? 'Four wire, fully compensated' : 'Three wire, compensated',
                  status: 'ok' as const,
                },
              ]),
        ],
        steps,
        warnings: [
          'A two-wire RTD connection adds the lead resistance directly to the measurement. On a Pt100 that is roughly 2.6 degrees C per ohm, so a long run produces a large and completely invisible error.',
          'This uses the IEC 60751 alpha 385 coefficients. Sensors built to other curves, and thermistors, do not follow this relationship.',
          'A three-wire connection compensates only if the two current-carrying legs have equal resistance. Mismatched conductors or a bad termination reintroduce the error.',
        ],
      };
    },
    formulas: [
      {
        expr: 'R(t) = R0 (1 + A t + B t squared)   for t at or above 0 C',
        where: ['A = 3.9083e-3', 'B = -5.775e-7', 'R0 — resistance at 0 degrees C'],
      },
    ],
    assumptions: [
      'IEC 60751 platinum sensor with alpha of 0.00385.',
      'Ideal sensor with no self-heating and no tolerance class error.',
      'Lead error is applied only to the two-wire case.',
    ],
    standards: ['IEC 60751 for platinum resistance thermometers'],
    related: ['/controls/instrumentation/signals/digital-signals'],
    relatedCalculators: ['4-20-ma-scaling'],
    faqs: [
      {
        q: 'Why does my two-wire RTD read high?',
        a: 'Because the lead resistance is added to the sensor resistance and the transmitter cannot tell them apart. On a Pt100 each ohm of lead resistance is roughly 2.6 degrees C. Use three or four wires, or mount the transmitter at the sensor.',
      },
      {
        q: 'Is Pt1000 better than Pt100?',
        a: 'For long two-wire runs, yes, because lead resistance is a much smaller fraction of the sensor resistance. The trade-off is compatibility, since many inputs expect Pt100.',
      },
    ],
  },
];
