import { fmt, num, pct, sig, str, type Calculator } from '../calc-types';

/** Cubic feet to US gallons. */
const CF_TO_GAL = 7.48052;

export const PROCESS_CALCULATORS: Calculator[] = [
  {
    slug: 'pump-horsepower',
    title: 'Pump Horsepower and Total Dynamic Head',
    category: 'Water & Wastewater',
    summary:
      'Hydraulic horsepower, brake horsepower, and motor input power from flow, head, specific gravity, and efficiency.',
    answer:
      'Hydraulic horsepower is flow in gallons per minute multiplied by total dynamic head in feet, multiplied by specific gravity, divided by 3960. Brake horsepower is that figure divided by the pump efficiency, and motor input power is brake horsepower divided by the motor efficiency.',
    keywords: ['pump', 'horsepower', 'TDH', 'brake horsepower', 'efficiency', 'hydraulic'],
    fields: [
      { kind: 'number', key: 'flow', label: 'Flow', unit: 'gpm', default: 500, min: 0.1 },
      { kind: 'number', key: 'staticHead', label: 'Static lift', unit: 'ft', default: 45, min: 0 },
      { kind: 'number', key: 'frictionHead', label: 'Friction and fitting losses', unit: 'ft', default: 18, min: 0 },
      { kind: 'number', key: 'pressureHead', label: 'Discharge pressure requirement', unit: 'ft', default: 0, min: 0, help: 'Convert psi to feet by multiplying by 2.31 divided by specific gravity.' },
      { kind: 'number', key: 'sg', label: 'Specific gravity', default: 1.0, min: 0.1, max: 3, step: 0.01, help: '1.0 for water. Raw wastewater is close to 1.0; sludge is higher.' },
      { kind: 'number', key: 'pumpEff', label: 'Pump efficiency', unit: '%', default: 70, min: 10, max: 95, step: 1 },
      { kind: 'number', key: 'motorEff', label: 'Motor efficiency', unit: '%', default: 93, min: 50, max: 99, step: 0.5 },
    ],
    run: (v) => {
      const flow = num(v.flow, 0);
      const staticHead = num(v.staticHead, 0);
      const frictionHead = num(v.frictionHead, 0);
      const pressureHead = num(v.pressureHead, 0);
      const sg = num(v.sg, 1);
      const pumpEff = num(v.pumpEff, 70) / 100;
      const motorEff = num(v.motorEff, 93) / 100;

      if (flow <= 0) return { outputs: [], error: 'Flow must be greater than zero.' };
      if (pumpEff <= 0 || motorEff <= 0) return { outputs: [], error: 'Efficiencies must be greater than zero.' };

      const tdh = staticHead + frictionHead + pressureHead;
      const whp = (flow * tdh * sg) / 3960;
      const bhp = whp / pumpEff;
      const inputKw = (bhp * 0.746) / motorEff;

      const catalogHp = [1, 1.5, 2, 3, 5, 7.5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 100, 125, 150, 200];
      const motorHp = catalogHp.find((size) => size >= bhp);

      const psi = (tdh * sg) / 2.31;

      return {
        outputs: [
          { label: 'Total dynamic head', value: fmt(tdh, 1), unit: 'ft', emphasis: true, note: `${fmt(psi, 1)} psi` },
          { label: 'Hydraulic horsepower', value: fmt(whp, 2), unit: 'hp' },
          { label: 'Brake horsepower', value: fmt(bhp, 2), unit: 'hp', emphasis: true, note: `At ${fmt(pumpEff * 100, 0)}% pump efficiency` },
          {
            label: 'Next catalog motor size',
            value: motorHp ? `${motorHp} hp` : 'Above 200 hp',
            note: 'Confirm the motor is non-overloading across the full operating range, not just at this point.',
          },
          { label: 'Motor input power', value: fmt(inputKw, 2), unit: 'kW', note: `At ${fmt(motorEff * 100, 1)}% motor efficiency` },
          { label: 'Energy at continuous duty', value: fmt(inputKw * 24, 1), unit: 'kWh per day' },
          {
            label: 'Wire-to-water efficiency',
            value: pct(pumpEff * motorEff * 100, 1),
            note: 'Pump and motor combined. Drive and transmission losses are additional.',
          },
        ],
        steps: [
          `TDH = ${fmt(staticHead, 1)} static + ${fmt(frictionHead, 1)} friction + ${fmt(pressureHead, 1)} pressure = ${fmt(tdh, 1)} ft`,
          `WHP = (${fmt(flow, 0)} gpm x ${fmt(tdh, 1)} ft x ${fmt(sg, 2)}) / 3960 = ${fmt(whp, 2)} hp`,
          `BHP = ${fmt(whp, 2)} / ${fmt(pumpEff, 2)} = ${fmt(bhp, 2)} hp`,
          `Motor input = ${fmt(bhp, 2)} hp x 0.746 / ${fmt(motorEff, 2)} = ${fmt(inputKw, 2)} kW`,
        ],
        warnings: [
          'A pump operates where its curve crosses the system curve, which is often not the point you calculated. Check the duty point on the manufacturer curve rather than assuming.',
          'Pump efficiency varies across the curve. The value at the best efficiency point does not apply at the ends, and a pump run far from that point wastes energy and wears quickly.',
          'Size the motor to be non-overloading across the whole operating range. A pump running out on its curve at low head can draw more power than at the design point.',
          'Friction losses change as pipe ages and as the system fouls. A force main sized on new-pipe friction will see higher head years later.',
        ],
      };
    },
    formulas: [
      {
        expr: 'WHP = (Q x H x SG) / 3960',
        where: ['Q — flow in gallons per minute', 'H — total dynamic head in feet', 'SG — specific gravity'],
      },
      { expr: 'BHP = WHP / pump efficiency' },
      { expr: 'Motor input kW = BHP x 0.746 / motor efficiency' },
    ],
    assumptions: [
      'Centrifugal pump at a single duty point.',
      'Head values are supplied by you. This does not calculate friction from pipe data.',
      'Ignores drive losses, mechanical seal losses, and any transmission.',
    ],
    related: ['/water-wastewater/water-systems/water-pumping/high-service-pumps'],
    relatedCalculators: ['pump-affinity-laws', 'pipe-friction-loss', 'wet-well-cycle'],
    faqs: [
      {
        q: 'Where does 3960 come from?',
        a: 'It is the unit conversion that turns gallons per minute and feet of head into horsepower: 33,000 foot-pounds per minute per horsepower divided by 8.34 pounds per gallon.',
      },
      {
        q: 'Should I use specific gravity for wastewater?',
        a: 'Raw wastewater is close enough to 1.0 for most purposes. Thickened sludge is meaningfully heavier and the specific gravity matters there.',
      },
    ],
  },

  {
    slug: 'pump-affinity-laws',
    title: 'Pump Affinity Laws',
    category: 'Water & Wastewater',
    summary:
      'How flow, head, and power change with pump speed or impeller diameter, and the energy saving a variable frequency drive can deliver.',
    answer:
      'The affinity laws state that flow varies directly with speed, head varies with the square of speed, and power varies with the cube of speed. Reducing a pump to 80% speed gives 80% flow, 64% head, and 51% power, which is why variable speed pumping saves energy where the system allows it.',
    keywords: ['affinity laws', 'pump speed', 'VFD', 'energy saving', 'impeller'],
    fields: [
      { kind: 'number', key: 'flow1', label: 'Flow at the known point', unit: 'gpm', default: 500, min: 0.1 },
      { kind: 'number', key: 'head1', label: 'Head at the known point', unit: 'ft', default: 60, min: 0.1 },
      { kind: 'number', key: 'power1', label: 'Power at the known point', unit: 'hp', default: 12, min: 0.01 },
      { kind: 'number', key: 'speed1', label: 'Known speed', unit: 'rpm', default: 1750, min: 1 },
      { kind: 'number', key: 'speed2', label: 'New speed', unit: 'rpm', default: 1400, min: 1 },
      { kind: 'number', key: 'staticHead', label: 'Static head in the system', unit: 'ft', default: 0, min: 0, help: 'Affinity laws assume the system is all friction. Static head breaks that assumption; enter it to see the caution.' },
    ],
    run: (v) => {
      const flow1 = num(v.flow1, 1);
      const head1 = num(v.head1, 1);
      const power1 = num(v.power1, 1);
      const speed1 = num(v.speed1, 1);
      const speed2 = num(v.speed2, 1);
      const staticHead = num(v.staticHead, 0);

      if (speed1 <= 0 || speed2 <= 0) return { outputs: [], error: 'Speeds must be greater than zero.' };

      const ratio = speed2 / speed1;
      const flow2 = flow1 * ratio;
      const head2 = head1 * ratio * ratio;
      const power2 = power1 * ratio * ratio * ratio;

      const savingPct = ((power1 - power2) / power1) * 100;
      const staticFraction = head1 > 0 ? (staticHead / head1) * 100 : 0;
      const staticDominant = staticFraction > 30;

      return {
        outputs: [
          { label: 'Speed ratio', value: fmt(ratio, 4), note: `${fmt(speed2, 0)} / ${fmt(speed1, 0)} rpm` },
          { label: 'New flow', value: fmt(flow2, 1), unit: 'gpm', emphasis: true, note: `${pct(ratio * 100, 1)} of original` },
          { label: 'New head', value: fmt(head2, 1), unit: 'ft', emphasis: true, note: `${pct(ratio * ratio * 100, 1)} of original` },
          { label: 'New power', value: fmt(power2, 2), unit: 'hp', emphasis: true, note: `${pct(ratio ** 3 * 100, 1)} of original` },
          {
            label: 'Power change',
            value: `${savingPct >= 0 ? '-' : '+'}${fmt(Math.abs(savingPct), 1)}%`,
            status: savingPct > 0 ? 'ok' : 'caution',
          },
          {
            label: 'Static head as a share of total',
            value: pct(staticFraction, 0),
            status: staticDominant ? 'over' : 'ok',
            note: staticDominant
              ? 'The affinity laws do not describe this system well. Predicted savings will not be achieved.'
              : 'Mostly friction, so the affinity laws apply reasonably.',
          },
        ],
        steps: [
          `Speed ratio = ${fmt(speed2, 0)} / ${fmt(speed1, 0)} = ${fmt(ratio, 4)}`,
          `Flow = ${fmt(flow1, 1)} x ${fmt(ratio, 4)} = ${fmt(flow2, 1)} gpm`,
          `Head = ${fmt(head1, 1)} x ${fmt(ratio, 4)} squared = ${fmt(head2, 1)} ft`,
          `Power = ${fmt(power1, 2)} x ${fmt(ratio, 4)} cubed = ${fmt(power2, 2)} hp`,
        ],
        warnings: [
          'The affinity laws assume a system curve that is entirely friction and passes through the origin. Where static lift dominates, as at most lift stations, reducing speed does not reduce power anywhere near the cube law and can stop the pump delivering entirely.',
          'Below a minimum speed the pump cannot overcome static head and delivers nothing while still drawing power. Establish that minimum speed and enforce it in the control logic.',
          'Efficiency is not constant with speed. The laws predict the operating point, not the efficiency at it.',
          ...(staticDominant
            ? ['Static head is a large share of the total here, so the predicted power saving is optimistic. Check the pump curve against the real system curve.']
            : []),
        ],
      };
    },
    formulas: [
      { expr: 'Q2 / Q1 = N2 / N1' },
      { expr: 'H2 / H1 = (N2 / N1) squared' },
      { expr: 'P2 / P1 = (N2 / N1) cubed' },
    ],
    assumptions: [
      'Friction-dominated system curve passing through the origin.',
      'Constant efficiency between the two operating points, which is an approximation.',
      'Applies to speed change. Impeller trimming follows similar but not identical relationships.',
    ],
    related: ['/water-wastewater/wastewater-systems/wastewater-pump-control/vfd-pump-control'],
    relatedCalculators: ['pump-horsepower', 'wet-well-cycle'],
    faqs: [
      {
        q: 'Why is my VFD not saving the energy the cube law predicts?',
        a: 'Because your system has static head. The cube law assumes all head is friction. At a lift station lifting sewage thirty feet, most of the head does not go away when you slow down, so the savings are far smaller.',
      },
    ],
  },

  {
    slug: 'wet-well-cycle',
    title: 'Wet Well Volume and Pump Cycle Time',
    category: 'Water & Wastewater',
    summary:
      'Working volume, fill time, pump-down time, cycle length, and starts per hour for a wet well, including the worst-case inflow for cycling.',
    answer:
      'Wet well working volume is the plan area multiplied by the depth between the pump start and stop levels. Cycle time is the fill time plus the pump-down time, and starts per hour is 3600 divided by the cycle in seconds. The worst case for short cycling is an inflow of half the pump capacity, not the lowest inflow.',
    keywords: ['wet well', 'cycle time', 'starts per hour', 'lift station', 'pump down', 'volume'],
    fields: [
      {
        kind: 'select',
        key: 'shape',
        label: 'Wet well shape',
        options: [
          { value: 'round', label: 'Round' },
          { value: 'rect', label: 'Rectangular' },
        ],
        default: 'round',
      },
      { kind: 'number', key: 'diameter', label: 'Diameter (round)', unit: 'ft', default: 8, min: 0.5, step: 0.5 },
      { kind: 'number', key: 'length', label: 'Length (rectangular)', unit: 'ft', default: 8, min: 0.5, step: 0.5 },
      { kind: 'number', key: 'width', label: 'Width (rectangular)', unit: 'ft', default: 6, min: 0.5, step: 0.5 },
      { kind: 'number', key: 'band', label: 'Depth between start and stop levels', unit: 'ft', default: 3, min: 0.1, step: 0.1 },
      { kind: 'number', key: 'pumpCapacity', label: 'Pump capacity', unit: 'gpm', default: 350, min: 1 },
      { kind: 'number', key: 'inflow', label: 'Inflow', unit: 'gpm', default: 90, min: 0 },
      { kind: 'number', key: 'maxStarts', label: 'Motor starts per hour limit', default: 8, min: 1, max: 30, help: 'From the motor nameplate or manufacturer data. Six to ten is typical for submersible motors.' },
    ],
    run: (v) => {
      const shape = str(v.shape, 'round');
      const band = num(v.band, 1);
      const pumpCapacity = num(v.pumpCapacity, 1);
      const inflow = num(v.inflow, 0);
      const maxStarts = num(v.maxStarts, 8);

      const area =
        shape === 'round'
          ? Math.PI * (num(v.diameter, 8) / 2) ** 2
          : num(v.length, 8) * num(v.width, 6);

      if (area <= 0 || band <= 0) return { outputs: [], error: 'Dimensions must be greater than zero.' };
      if (inflow >= pumpCapacity) {
        return {
          outputs: [
            { label: 'Working volume', value: fmt(area * band * CF_TO_GAL, 0), unit: 'gal', emphasis: true },
          ],
          error: 'Inflow equals or exceeds pump capacity. The pump runs continuously and the level will keep rising.',
        };
      }

      const volumeGal = area * band * CF_TO_GAL;
      const fillMin = inflow > 0 ? volumeGal / inflow : Number.POSITIVE_INFINITY;
      const pumpDownMin = volumeGal / (pumpCapacity - inflow);
      const cycleMin = fillMin + pumpDownMin;
      const startsPerHour = 60 / cycleMin;

      // Worst case for cycling is an inflow of half the pump capacity.
      const worstInflow = pumpCapacity / 2;
      const worstCycleMin = volumeGal / worstInflow + volumeGal / (pumpCapacity - worstInflow);
      const worstStarts = 60 / worstCycleMin;

      const withinLimit = worstStarts <= maxStarts;
      const requiredVolume = (2 * pumpCapacity) / (4 * maxStarts) * 60;

      return {
        outputs: [
          { label: 'Working volume', value: fmt(volumeGal, 0), unit: 'gal', emphasis: true, note: `${fmt(area, 1)} sq ft x ${fmt(band, 2)} ft` },
          {
            label: 'Cycle time at this inflow',
            value: Number.isFinite(cycleMin) ? `${fmt(cycleMin, 1)} min` : 'No inflow entered',
            emphasis: true,
            note: Number.isFinite(fillMin) ? `${fmt(fillMin, 1)} min fill, ${fmt(pumpDownMin, 1)} min pump down` : undefined,
          },
          {
            label: 'Starts per hour at this inflow',
            value: Number.isFinite(startsPerHour) ? fmt(startsPerHour, 2) : '0',
            status: startsPerHour <= maxStarts ? 'ok' : 'over',
          },
          {
            label: 'Worst-case starts per hour',
            value: fmt(worstStarts, 2),
            emphasis: true,
            status: withinLimit ? 'ok' : 'over',
            note: `Occurs at an inflow of ${fmt(worstInflow, 0)} gpm, which is half the pump capacity`,
          },
          {
            label: 'Against the motor limit',
            value: withinLimit ? 'Within limit' : 'Exceeds limit',
            status: withinLimit ? 'ok' : 'over',
            note: withinLimit
              ? `${fmt(worstStarts, 1)} worst-case starts against a limit of ${fmt(maxStarts, 0)}`
              : `Widen the level band. About ${fmt(requiredVolume, 0)} gallons of working volume is needed for ${fmt(maxStarts, 0)} starts per hour.`,
          },
          { label: 'Volume needed for the starts limit', value: fmt(requiredVolume, 0), unit: 'gal', note: `Band of about ${fmt(requiredVolume / CF_TO_GAL / area, 2)} ft` },
          {
            label: 'Detention time at this inflow',
            value: Number.isFinite(fillMin) ? `${fmt(fillMin, 1)} min` : '—',
            status: fillMin > 30 ? 'caution' : 'ok',
            note: fillMin > 30 ? 'Long detention. Expect septicity, odour, and hydrogen sulfide.' : undefined,
          },
          { label: 'Pump run time per cycle', value: fmt(pumpDownMin, 1), unit: 'min', status: pumpDownMin < 1 ? 'caution' : 'ok', note: pumpDownMin < 1 ? 'Very short runs. Check against the minimum run time.' : undefined },
        ],
        steps: [
          `Area = ${fmt(area, 2)} sq ft`,
          `Working volume = ${fmt(area, 2)} sq ft x ${fmt(band, 2)} ft x ${CF_TO_GAL} = ${fmt(volumeGal, 0)} gal`,
          Number.isFinite(fillMin) ? `Fill time = ${fmt(volumeGal, 0)} / ${fmt(inflow, 0)} gpm = ${fmt(fillMin, 1)} min` : 'No inflow entered',
          `Pump down = ${fmt(volumeGal, 0)} / (${fmt(pumpCapacity, 0)} - ${fmt(inflow, 0)}) = ${fmt(pumpDownMin, 1)} min`,
          `Worst case at ${fmt(worstInflow, 0)} gpm inflow gives ${fmt(worstStarts, 2)} starts per hour`,
        ],
        warnings: [
          'The worst case for short cycling is an inflow of half the pump capacity, not the lowest inflow. Sizing the level band against low flow alone misses the real constraint.',
          'A wider band reduces starts but increases detention time, and long detention turns the well septic and generates hydrogen sulfide that corrodes the structure downstream. Both constraints have to be satisfied.',
          'Pump run time must also be long enough to reach scour velocity in the force main, or solids settle in it.',
          'This assumes a constant inflow and a constant pump rate. Real inflow varies through the day and pump rate varies with wet well level.',
        ],
      };
    },
    formulas: [
      { expr: 'Volume (gal) = area (sq ft) x band (ft) x 7.48' },
      { expr: 'Cycle = volume / inflow + volume / (pump capacity - inflow)' },
      { expr: 'Starts per hour = 60 / cycle in minutes' },
      { expr: 'Worst case occurs at inflow = pump capacity / 2' },
    ],
    assumptions: [
      'Constant inflow and constant pump rate.',
      'Uniform cross-section over the level band, which is not true of a benched or sloped wet well.',
      'Single pump running. Duplex operation with both pumps changes the pump-down rate.',
    ],
    related: [
      '/water-wastewater/wastewater-systems/lift-stations/wet-well-control',
      '/water-wastewater/wastewater-systems/lift-stations/duplex-lift-stations',
    ],
    relatedCalculators: ['tank-volume', 'pump-horsepower', 'detention-time'],
    faqs: [
      {
        q: 'Why is the worst case at half the pump capacity?',
        a: 'Cycle time is fill time plus pump-down time. At low inflow the fill is long; at high inflow the pump-down is long. The two combine to a minimum when inflow is half the pump rate, and that is where starts per hour peak.',
      },
      {
        q: 'How wide should the level band be?',
        a: 'Wide enough that worst-case starts stay within the motor rating, and narrow enough that detention time at low flow does not turn the well septic. Calculate both and use the widest band the detention limit allows.',
      },
    ],
  },

  {
    slug: 'tank-volume',
    title: 'Tank and Basin Volume',
    category: 'Water & Wastewater',
    summary:
      'Volume of a cylindrical or rectangular tank at a given level, in gallons, cubic feet, and cubic metres, with the volume per foot of depth.',
    answer:
      'A cylindrical tank holds pi multiplied by the radius squared, multiplied by the liquid depth. A rectangular basin holds length multiplied by width multiplied by depth. Multiply cubic feet by 7.48 to get US gallons.',
    keywords: ['tank volume', 'basin', 'gallons', 'capacity', 'level'],
    fields: [
      {
        kind: 'select',
        key: 'shape',
        label: 'Shape',
        options: [
          { value: 'round', label: 'Cylindrical (vertical)' },
          { value: 'rect', label: 'Rectangular' },
        ],
        default: 'round',
      },
      { kind: 'number', key: 'diameter', label: 'Diameter (cylindrical)', unit: 'ft', default: 30, min: 0.1, step: 0.1 },
      { kind: 'number', key: 'length', label: 'Length (rectangular)', unit: 'ft', default: 40, min: 0.1, step: 0.1 },
      { kind: 'number', key: 'width', label: 'Width (rectangular)', unit: 'ft', default: 20, min: 0.1, step: 0.1 },
      { kind: 'number', key: 'level', label: 'Liquid level', unit: 'ft', default: 12, min: 0, step: 0.01 },
      { kind: 'number', key: 'fullHeight', label: 'Full height', unit: 'ft', default: 24, min: 0.1, step: 0.1 },
    ],
    run: (v) => {
      const shape = str(v.shape, 'round');
      const level = num(v.level, 0);
      const fullHeight = num(v.fullHeight, 1);

      const area = shape === 'round' ? Math.PI * (num(v.diameter, 30) / 2) ** 2 : num(v.length, 40) * num(v.width, 20);
      if (area <= 0) return { outputs: [], error: 'Dimensions must be greater than zero.' };

      const cubicFeet = area * level;
      const gallons = cubicFeet * CF_TO_GAL;
      const fullGallons = area * fullHeight * CF_TO_GAL;
      const perFoot = area * CF_TO_GAL;
      const percentFull = fullHeight > 0 ? (level / fullHeight) * 100 : 0;

      return {
        outputs: [
          { label: 'Volume at this level', value: fmt(gallons, 0), unit: 'gal', emphasis: true },
          { label: 'Volume at this level', value: fmt(cubicFeet, 1), unit: 'cu ft' },
          { label: 'Volume at this level', value: fmt(cubicFeet * 0.0283168, 2), unit: 'cu m' },
          { label: 'Full capacity', value: fmt(fullGallons, 0), unit: 'gal', note: `At ${fmt(fullHeight, 2)} ft` },
          {
            label: 'Percent full',
            value: pct(percentFull, 1),
            status: percentFull > 100 ? 'over' : 'ok',
            note: percentFull > 100 ? 'The level entered is above the full height.' : undefined,
          },
          { label: 'Volume per foot of depth', value: fmt(perFoot, 0), unit: 'gal per ft', note: 'Useful for turning a level change into a volume for a drawdown test.' },
          { label: 'Volume per inch of depth', value: fmt(perFoot / 12, 1), unit: 'gal per in' },
          { label: 'Plan area', value: fmt(area, 2), unit: 'sq ft' },
        ],
        steps: [
          shape === 'round'
            ? `Area = pi x (${fmt(num(v.diameter, 30) / 2, 2)} ft) squared = ${fmt(area, 2)} sq ft`
            : `Area = ${fmt(num(v.length, 40), 2)} x ${fmt(num(v.width, 20), 2)} = ${fmt(area, 2)} sq ft`,
          `Volume = ${fmt(area, 2)} sq ft x ${fmt(level, 2)} ft = ${fmt(cubicFeet, 1)} cu ft`,
          `Gallons = ${fmt(cubicFeet, 1)} x ${CF_TO_GAL} = ${fmt(gallons, 0)} gal`,
        ],
        warnings: [
          'Assumes vertical walls and a flat bottom. Coned, dished, or benched bottoms hold less than this near the floor, which matters most at the low levels a pump-off setpoint uses.',
          'A drawdown test using the volume per foot figure is one of the few practical ways to verify a pump rate in the field, and it is worth doing at commissioning.',
        ],
      };
    },
    formulas: [
      { expr: 'Cylindrical volume = pi x radius squared x depth' },
      { expr: 'Rectangular volume = length x width x depth' },
      { expr: 'Gallons = cubic feet x 7.48052' },
    ],
    assumptions: ['Vertical walls, flat bottom, uniform cross-section.'],
    related: ['/water-wastewater/water-systems/storage/ground-storage-tanks'],
    relatedCalculators: ['wet-well-cycle', 'detention-time'],
    faqs: [
      {
        q: 'How do I verify a pump rate in the field?',
        a: 'Isolate the inflow if you can, run the pump, and time a known level change. Volume per foot multiplied by the level change, divided by the run time, gives the actual pumping rate.',
      },
    ],
  },

  {
    slug: 'flow-unit-converter',
    title: 'Flow Unit Converter',
    category: 'Conversions',
    summary:
      'Convert between gallons per minute, million gallons per day, cubic feet per second, litres per second, and cubic metres per hour.',
    answer:
      'Common flow conversions in water and wastewater work: one million gallons per day is 694.4 gallons per minute, one cubic foot per second is 448.8 gallons per minute, one litre per second is 15.85 gallons per minute, and one cubic metre per hour is 4.403 gallons per minute.',
    keywords: ['flow conversion', 'gpm', 'MGD', 'cfs', 'litres per second', 'units'],
    fields: [
      { kind: 'number', key: 'value', label: 'Flow', default: 500, min: 0, step: 0.001 },
      {
        kind: 'select',
        key: 'unit',
        label: 'Unit',
        options: [
          { value: 'gpm', label: 'Gallons per minute (gpm)' },
          { value: 'mgd', label: 'Million gallons per day (MGD)' },
          { value: 'gpd', label: 'Gallons per day (gpd)' },
          { value: 'cfs', label: 'Cubic feet per second (cfs)' },
          { value: 'lps', label: 'Litres per second (L/s)' },
          { value: 'm3h', label: 'Cubic metres per hour (m3/h)' },
          { value: 'gph', label: 'Gallons per hour (gph)' },
        ],
        default: 'gpm',
      },
    ],
    run: (v) => {
      const value = num(v.value, 0);
      const unit = str(v.unit, 'gpm');

      // Everything routes through gallons per minute.
      const toGpm: Record<string, number> = {
        gpm: 1,
        mgd: 694.4444,
        gpd: 1 / 1440,
        cfs: 448.8312,
        lps: 15.85032,
        m3h: 4.402868,
        gph: 1 / 60,
      };

      const gpm = value * (toGpm[unit] ?? 1);
      if (!Number.isFinite(gpm) || gpm < 0) return { outputs: [], error: 'Enter a value of zero or more.' };

      return {
        outputs: [
          { label: 'Gallons per minute', value: sig(gpm, 6), unit: 'gpm', emphasis: true },
          { label: 'Million gallons per day', value: sig(gpm / 694.4444, 6), unit: 'MGD', emphasis: true },
          { label: 'Gallons per day', value: fmt(gpm * 1440, 0), unit: 'gpd' },
          { label: 'Gallons per hour', value: sig(gpm * 60, 6), unit: 'gph' },
          { label: 'Cubic feet per second', value: sig(gpm / 448.8312, 6), unit: 'cfs' },
          { label: 'Litres per second', value: sig(gpm / 15.85032, 6), unit: 'L/s' },
          { label: 'Cubic metres per hour', value: sig(gpm / 4.402868, 6), unit: 'm3/h' },
          { label: 'Cubic metres per day', value: sig((gpm / 4.402868) * 24, 6), unit: 'm3/d' },
        ],
        steps: [`${fmt(value, 4)} ${unit} = ${sig(gpm, 6)} gpm, then converted from there`],
        warnings: [
          'US gallons, not imperial. An imperial gallon is about 1.2 US gallons and mixing the two produces a 20% error.',
        ],
      };
    },
    assumptions: ['US liquid gallons throughout.'],
    relatedCalculators: ['chemical-dosing', 'detention-time', 'pipe-friction-loss'],
    faqs: [
      {
        q: 'How many gpm is 1 MGD?',
        a: '694.4 gallons per minute. A million gallons divided by 1440 minutes in a day.',
      },
    ],
  },

  {
    slug: 'chemical-dosing',
    title: 'Chemical Dosing Calculator',
    category: 'Water & Wastewater',
    summary:
      'Chemical feed rate from dose and flow, in pounds per day and in gallons per day of solution, with the metering pump setting.',
    answer:
      'The pounds formula gives chemical feed as dose in milligrams per litre multiplied by flow in million gallons per day, multiplied by 8.34. To convert that to a solution feed rate, divide by 8.34, by the solution specific gravity, and by the strength as a decimal fraction.',
    keywords: ['chemical dosing', 'pounds formula', 'chlorine', 'feed rate', 'mg/L', 'metering pump'],
    fields: [
      { kind: 'number', key: 'flow', label: 'Flow', unit: 'MGD', default: 1.5, min: 0.0001, step: 0.0001 },
      { kind: 'number', key: 'dose', label: 'Dose', unit: 'mg/L', default: 2.5, min: 0, step: 0.01 },
      { kind: 'number', key: 'strength', label: 'Solution strength', unit: '%', default: 12.5, min: 0.1, max: 100, step: 0.1, help: '12.5% for typical sodium hypochlorite. 100% for a dry chemical.' },
      { kind: 'number', key: 'sg', label: 'Solution specific gravity', default: 1.17, min: 0.5, max: 2, step: 0.01, help: 'About 1.17 for 12.5% sodium hypochlorite. 1.0 for water.' },
    ],
    run: (v) => {
      const flow = num(v.flow, 0);
      const dose = num(v.dose, 0);
      const strength = num(v.strength, 100) / 100;
      const sg = num(v.sg, 1);

      if (flow <= 0) return { outputs: [], error: 'Flow must be greater than zero.' };
      if (strength <= 0) return { outputs: [], error: 'Solution strength must be greater than zero.' };

      const lbsPerDay = dose * flow * 8.34;
      const solutionLbsPerDay = lbsPerDay / strength;
      const solutionGpd = solutionLbsPerDay / (8.34 * sg);
      const solutionGph = solutionGpd / 24;
      const mlPerMin = (solutionGpd * 3785.41) / 1440;
      const flowGpm = flow * 694.4444;

      return {
        outputs: [
          { label: 'Chemical required', value: fmt(lbsPerDay, 2), unit: 'lb per day', emphasis: true },
          { label: 'Solution feed rate', value: fmt(solutionGpd, 2), unit: 'gal per day', emphasis: true },
          { label: 'Solution feed rate', value: fmt(solutionGph, 3), unit: 'gal per hour' },
          { label: 'Metering pump setting', value: fmt(mlPerMin, 1), unit: 'mL per minute' },
          { label: 'Solution consumed', value: fmt(solutionLbsPerDay, 2), unit: 'lb per day' },
          { label: 'Process flow', value: fmt(flowGpm, 0), unit: 'gpm' },
          {
            label: 'Ratio of solution to process flow',
            value: `1 : ${fmt(flowGpm / (solutionGpd / 1440), 0)}`,
            note: 'Useful for checking that the injection point gives adequate mixing.',
          },
        ],
        steps: [
          `Chemical = ${fmt(dose, 2)} mg/L x ${fmt(flow, 4)} MGD x 8.34 = ${fmt(lbsPerDay, 2)} lb per day`,
          `Solution required = ${fmt(lbsPerDay, 2)} / ${fmt(strength, 3)} strength = ${fmt(solutionLbsPerDay, 2)} lb per day`,
          `Solution volume = ${fmt(solutionLbsPerDay, 2)} / (8.34 x ${fmt(sg, 2)}) = ${fmt(solutionGpd, 2)} gal per day`,
        ],
        warnings: [
          'Dose is what you apply. Residual is what remains after demand. Sizing a feed system on residual rather than dose will undersize it.',
          'Sodium hypochlorite loses strength in storage, faster when warm. A tank that started at 12.5% may be considerably weaker weeks later, and the feed rate has to compensate.',
          'Chemical feed systems require their own safety review: containment, compatible materials, ventilation, eyewash, and personal protective equipment. Nothing here addresses that.',
          'Verify the actual feed rate by drawdown against a calibration cylinder. Metering pump dial settings are not accurate enough to trust without checking.',
        ],
      };
    },
    formulas: [
      {
        expr: 'lb per day = dose (mg/L) x flow (MGD) x 8.34',
        where: ['8.34 — pounds per gallon of water'],
      },
      { expr: 'solution gpd = (lb per day / strength) / (8.34 x specific gravity)' },
    ],
    assumptions: [
      'The 8.34 constant assumes water at standard conditions.',
      'Assumes the solution strength you enter is the actual current strength, not the as-delivered strength.',
      'Does not account for chemical demand, decay, or reaction kinetics.',
    ],
    related: ['/water-wastewater/water-systems/water-treatment/chemical-feed'],
    relatedCalculators: ['flow-unit-converter', 'detention-time'],
    faqs: [
      {
        q: 'Where does 8.34 come from?',
        a: 'It is the weight of one US gallon of water in pounds. The pounds formula relies on it, which is why it is only strictly correct for water at standard conditions.',
      },
      {
        q: 'Why is my residual lower than the dose?',
        a: 'Because the water exerts a demand that consumes chemical before any residual remains. Dose minus demand equals residual, and demand varies with the water quality.',
      },
    ],
  },

  {
    slug: 'detention-time',
    title: 'Detention Time Calculator',
    category: 'Water & Wastewater',
    summary:
      'How long water stays in a tank or basin at a given flow, in hours and minutes, with the volume turnover per day.',
    answer:
      'Detention time is the volume of a tank divided by the flow through it. A 100,000 gallon basin passing 500 gallons per minute has a detention time of 200 minutes, or about 3.3 hours. It is the basic measure behind contact time, clarifier performance, and wet well septicity.',
    keywords: ['detention time', 'retention time', 'contact time', 'HRT', 'basin'],
    fields: [
      { kind: 'number', key: 'volume', label: 'Volume', unit: 'gal', default: 100000, min: 1 },
      { kind: 'number', key: 'flow', label: 'Flow', unit: 'gpm', default: 500, min: 0.001, step: 0.001 },
    ],
    run: (v) => {
      const volume = num(v.volume, 1);
      const flow = num(v.flow, 1);

      if (flow <= 0) return { outputs: [], error: 'Flow must be greater than zero.' };

      const minutes = volume / flow;
      const hours = minutes / 60;
      const days = hours / 24;
      const turnovers = 1440 / minutes;

      return {
        outputs: [
          {
            label: 'Detention time',
            value: hours >= 1 ? `${fmt(hours, 2)} h` : `${fmt(minutes, 1)} min`,
            emphasis: true,
            note: `${fmt(minutes, 1)} minutes`,
          },
          { label: 'Detention time', value: fmt(hours, 3), unit: 'hours' },
          { label: 'Detention time', value: fmt(days, 4), unit: 'days' },
          { label: 'Turnovers per day', value: fmt(turnovers, 2) },
          { label: 'Flow', value: fmt(flow * 1440 / 1e6, 4), unit: 'MGD' },
          {
            label: 'Septicity risk at this detention',
            value: hours > 4 ? 'Elevated' : hours > 2 ? 'Moderate' : 'Low',
            status: hours > 4 ? 'over' : hours > 2 ? 'caution' : 'ok',
            note: 'A rough guide for raw wastewater in a wet well or holding structure. Temperature and the strength of the wastewater both matter.',
          },
        ],
        steps: [
          `Detention = ${fmt(volume, 0)} gal / ${fmt(flow, 2)} gpm = ${fmt(minutes, 1)} minutes`,
          `= ${fmt(hours, 3)} hours`,
        ],
        warnings: [
          'This is theoretical detention time. Short-circuiting means the actual time water spends in a basin is often much shorter, which is why baffling and inlet design matter for a clarifier or a contact chamber.',
          'Where contact time is a regulatory requirement, the calculation uses a baffling factor and the peak hourly flow, not a simple volume divided by average flow. Follow the method your regulator requires.',
          'In a wet well, long detention means septicity, odour, and hydrogen sulfide that corrodes concrete and metal downstream.',
        ],
      };
    },
    formulas: [{ expr: 'detention time = volume / flow' }],
    assumptions: [
      'Theoretical detention with ideal plug flow. Does not account for short-circuiting or dead zones.',
      'Does not apply a baffling factor.',
    ],
    related: ['/water-wastewater/wastewater-systems/lift-stations/wet-well-control'],
    relatedCalculators: ['tank-volume', 'wet-well-cycle', 'flow-unit-converter'],
    faqs: [
      {
        q: 'Is detention time the same as contact time?',
        a: 'No. Regulatory contact time for disinfection applies a baffling factor to account for short-circuiting and uses peak flow, so it is shorter than the theoretical detention time.',
      },
    ],
  },

  {
    slug: 'pipe-friction-loss',
    title: 'Pipe Velocity and Friction Loss',
    category: 'Water & Wastewater',
    summary:
      'Velocity and Hazen-Williams friction loss for a water pipe, with the head loss over the run and the velocity checked against practical limits.',
    answer:
      'Velocity in feet per second is 0.4085 multiplied by flow in gallons per minute, divided by the inside diameter in inches squared. Hazen-Williams friction loss depends on flow, diameter, and the roughness coefficient C, which is around 130 to 150 for new pipe and falls as pipe ages.',
    keywords: ['friction loss', 'Hazen-Williams', 'velocity', 'head loss', 'pipe', 'force main'],
    fields: [
      { kind: 'number', key: 'flow', label: 'Flow', unit: 'gpm', default: 500, min: 0.1 },
      { kind: 'number', key: 'diameter', label: 'Inside diameter', unit: 'in', default: 6, min: 0.25, step: 0.05 },
      { kind: 'number', key: 'length', label: 'Pipe length', unit: 'ft', default: 2500, min: 1 },
      {
        kind: 'select',
        key: 'c',
        label: 'Hazen-Williams C',
        options: [
          { value: '150', label: '150 — PVC and HDPE, new' },
          { value: '140', label: '140 — cement lined ductile iron, new' },
          { value: '130', label: '130 — PVC or lined pipe, some age' },
          { value: '120', label: '120 — steel or older lined pipe' },
          { value: '100', label: '100 — unlined cast iron, aged' },
          { value: '80', label: '80 — heavily tuberculated pipe' },
        ],
        default: '140',
      },
      { kind: 'number', key: 'fittings', label: 'Equivalent length of fittings', unit: 'ft', default: 150, min: 0, help: 'Valves, bends, and tees expressed as an equivalent straight length.' },
    ],
    run: (v) => {
      const flow = num(v.flow, 1);
      const diameter = num(v.diameter, 6);
      const length = num(v.length, 1);
      const c = Number(str(v.c, '140'));
      const fittings = num(v.fittings, 0);

      if (diameter <= 0) return { outputs: [], error: 'Diameter must be greater than zero.' };

      const velocity = (0.4085 * flow) / (diameter * diameter);
      const totalLength = length + fittings;
      // Hazen-Williams, US customary, gpm and inches.
      const lossPer100 = (10.44 * 100 * flow ** 1.852) / (c ** 1.852 * diameter ** 4.87);
      const totalLoss = (lossPer100 * totalLength) / 100;
      const psiLoss = totalLoss / 2.31;

      const velocityStatus = velocity > 8 ? 'over' : velocity > 5 ? 'caution' : velocity < 2 ? 'caution' : 'ok';

      return {
        outputs: [
          { label: 'Velocity', value: fmt(velocity, 2), unit: 'ft/s', emphasis: true, status: velocityStatus },
          { label: 'Friction head loss', value: fmt(totalLoss, 2), unit: 'ft', emphasis: true, note: `Over ${fmt(totalLength, 0)} equivalent feet` },
          { label: 'Friction head loss', value: fmt(psiLoss, 2), unit: 'psi' },
          { label: 'Loss per 100 ft', value: fmt(lossPer100, 3), unit: 'ft' },
          {
            label: 'Velocity assessment',
            value:
              velocity > 8
                ? 'High. Expect erosion and surge concerns.'
                : velocity > 5
                  ? 'Above typical design range.'
                  : velocity < 2
                    ? 'Low. May not scour solids in a force main.'
                    : 'Within the usual design range.',
            status: velocityStatus,
            note: 'Water mains are commonly designed around 3 to 5 ft/s. Wastewater force mains generally need at least 2 ft/s to scour.',
          },
          { label: 'Equivalent length used', value: fmt(totalLength, 0), unit: 'ft', note: `${fmt(length, 0)} pipe plus ${fmt(fittings, 0)} fittings` },
        ],
        steps: [
          `Velocity = 0.4085 x ${fmt(flow, 0)} gpm / ${fmt(diameter, 2)} in squared = ${fmt(velocity, 2)} ft/s`,
          `Loss per 100 ft = 10.44 x 100 x ${fmt(flow, 0)}^1.852 / (${c}^1.852 x ${fmt(diameter, 2)}^4.87) = ${fmt(lossPer100, 3)} ft`,
          `Total = ${fmt(lossPer100, 3)} x ${fmt(totalLength, 0)} / 100 = ${fmt(totalLoss, 2)} ft`,
        ],
        warnings: [
          'Hazen-Williams applies to water at ordinary temperatures in turbulent flow. It is not valid for viscous fluids, sludge, or gases.',
          'The C value falls as pipe ages and tuberculates. Designing a force main on new-pipe C and never revisiting it understates the head years later.',
          'Use the actual inside diameter, not the nominal size. The difference is significant on small pipe and the loss varies with diameter to the 4.87 power.',
          'Surge and water hammer are separate analyses. A long force main with a fast-closing valve needs one.',
        ],
      };
    },
    formulas: [
      { expr: 'V = 0.4085 x Q / d squared', where: ['V — ft/s', 'Q — gpm', 'd — inside diameter in inches'] },
      {
        expr: 'h_f per 100 ft = 10.44 x 100 x Q^1.852 / (C^1.852 x d^4.87)',
        where: ['C — Hazen-Williams roughness coefficient'],
      },
    ],
    assumptions: [
      'Water at ordinary temperature in turbulent flow. Not valid for sludge, viscous fluids, or gases.',
      'Inside diameter, not nominal pipe size.',
      'Fittings are entered by you as an equivalent straight length.',
    ],
    related: ['/water-wastewater/wastewater-systems/lift-stations/duplex-lift-stations'],
    relatedCalculators: ['pump-horsepower', 'flow-unit-converter'],
    faqs: [
      {
        q: 'What C value should I use for an existing force main?',
        a: 'Lower than the new-pipe value. If the main matters, measure it: run the pump, record discharge pressure and flow, and back-calculate C from the observed head loss. That number is worth far more than a table.',
      },
      {
        q: 'What velocity does a force main need?',
        a: 'At least about 2 ft/s at some point in each pumping cycle to scour settled solids. This is one of the constraints that argues for longer pump runs and a wider wet well level band.',
      },
    ],
  },
];
