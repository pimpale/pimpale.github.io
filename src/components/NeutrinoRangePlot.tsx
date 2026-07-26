import React from 'react';

import { SPECTRUM_E0, SPECTRUM_DE, U235_DNDE } from '../utils/u235Spectrum';

/**
 * Detection rate vs. range for the neutrino detector concepts discussed in the
 * article. One component, rendered several times with different `detectors`
 * lists to progressively reveal the comparison.
 *
 * All numbers are derived from the same source term as the supplement
 * (Appendix B), so the curves agree with the printed rates in the article --
 * with one deliberate exception, noted on `oscillates` below: the charged
 * current channels here carry the electron antineutrino survival probability,
 * which the article's Appendix M bullets omit.
 */

/* ------------------------------------------------------------------ */
/* Source term (Appendix B)                                            */
/* ------------------------------------------------------------------ */

const KNOT_MS = 0.514444;
const RHO_SEAWATER = 1025;                                  // kg/m^3
const HULL_DIAMETER = 12.8;                                 // m, Ohio class beam
const DRAG_K = 0.5 * RHO_SEAWATER * Math.PI * HULL_DIAMETER ** 2 / 4;
const HOTEL_LOAD_W = 500e3;                                 // W

const REFERENCE_SPEED_KN = 6;
const REFERENCE_SOURCE_RATE = 1.44e18;                      // nubar/s at 6 kn

/** Useful (electrical + mechanical) power draw at a given patrol speed. */
const usefulPower = (speedKn: number) =>
  HOTEL_LOAD_W + DRAG_K * (speedKn * KNOT_MS) ** 3;

const REFERENCE_POWER = usefulPower(REFERENCE_SPEED_KN);

/**
 * Antineutrino emission rate, anchored to Appendix B's 1.44e18 /s at 6 knots.
 * Reactor thermal efficiency cancels in the ratio, so only the hydrodynamic
 * V^3 term and the fixed hotel load matter here.
 */
const sourceRate = (speedKn: number) =>
  REFERENCE_SOURCE_RATE * usefulPower(speedKn) / REFERENCE_POWER;

/** Isotropic flux in nubar / cm^2 / s at a range in km. */
const flux = (rateNu: number, rangeKm: number) =>
  rateNu / (4 * Math.PI * (rangeKm * 1e5) ** 2);

/* ------------------------------------------------------------------ */
/* Oscillation suppression                                             */
/* ------------------------------------------------------------------ */

// PMNS mixing parameters, normal ordering. These are the same global-fit values
// used by the reference plot_oscillation.py, so this curve reproduces the
// article's oscillation figures rather than merely resembling them.
const THETA12 = 33.44 * Math.PI / 180;
const THETA13 = 8.57 * Math.PI / 180;
const DM2_21 = 7.42e-5;                                     // eV^2
const DM2_31 = 2.515e-3;                                    // eV^2
const DM2_32 = DM2_31 - DM2_21;

// |U_ei|^2 for the electron row of the PMNS matrix.
const U_E1_SQ = (Math.cos(THETA12) * Math.cos(THETA13)) ** 2;
const U_E2_SQ = (Math.sin(THETA12) * Math.cos(THETA13)) ** 2;
const U_E3_SQ = Math.sin(THETA13) ** 2;

/**
 * Three flavor electron antineutrino survival probability, L in km, E in MeV.
 * The 1267 prefactor is the usual 1.267 for L in km and E in GeV.
 */
function survivalProbability(lengthKm: number, energyMeV: number) {
  const phase = (dm2: number) => Math.sin(1267 * dm2 * lengthKm / energyMeV) ** 2;
  return 1 - 4 * (
    U_E1_SQ * U_E2_SQ * phase(DM2_21)
    + U_E1_SQ * U_E3_SQ * phase(DM2_31)
    + U_E2_SQ * U_E3_SQ * phase(DM2_32)
  );
}

/** Vogel & Beacom lowest order IBD cross section, cm^2 (Appendix C). */
const NEUTRON_PROTON_GAP = 1.293;                           // MeV
const POSITRON_MASS = 0.511;                                // MeV

// Returns 0 below the 1.806 MeV kinematic threshold, which is what removes the
// low-energy bulk of the reactor spectrum from every average taken here.
function ibdCrossSection(energyMeV: number) {
  const positronEnergy = energyMeV - NEUTRON_PROTON_GAP;
  if (positronEnergy <= POSITRON_MASS) return 0;
  const momentum = Math.sqrt(positronEnergy ** 2 - POSITRON_MASS ** 2);
  return 0.0952 * positronEnergy * momentum * 1e-42;
}

// Bin centers of the measured U-235 spectrum, and the weight each bin carries
// in a cross-section-weighted average: dN/dE * dE * sigma_IBD(E). That is, each
// bin is weighted by how many antineutrinos it holds *and* by how likely a
// detector is to see one of them.
const ENERGY_GRID = U235_DNDE.map((_, i) => SPECTRUM_E0 + i * SPECTRUM_DE);
const SPECTRUM_WEIGHTS = U235_DNDE.map(
  (dNdE, i) => dNdE * SPECTRUM_DE * ibdCrossSection(ENERGY_GRID[i]),
);
const WEIGHT_TOTAL = SPECTRUM_WEIGHTS.reduce((a, b) => a + b, 0);

/**
 * Spectrum averaged survival probability at a given baseline. Bottoms out at
 * 0.30 near 61 km, then averages up to ~0.55 once the fast phases wash out --
 * this is the curve behind the article's oscillation suppression figure.
 */
function oscillationSuppression(rangeKm: number) {
  let acc = 0;
  for (let i = 0; i < ENERGY_GRID.length; i++) {
    acc += SPECTRUM_WEIGHTS[i] * survivalProbability(rangeKm, ENERGY_GRID[i]);
  }
  return acc / WEIGHT_TOTAL;
}

/* ------------------------------------------------------------------ */
/* Detectors                                                           */
/* ------------------------------------------------------------------ */

type Platform = 'air' | 'sea' | 'any';

type Detector = {
  id: string,
  label: string,
  short: string,
  /** Effective total cross section of the whole instrument, cm^2. */
  sigma: number,
  /**
   * Charged current channels only see electron antineutrinos and so are
   * suppressed by oscillation. CEvNS and the spin transition are neutral
   * current, hence flavor blind, and are not.
   */
  oscillates: boolean,
  color: string,
  platform: Platform,
};

const DETECTORS: Detector[] = [
  {
    id: 'ibd-747',
    label: 'IBD — 747 (densified methane)',
    short: 'IBD 747',
    sigma: 1.76e-12,
    oscillates: true,
    color: '#fb4934',
    platform: 'air',
  },
  {
    id: 'ibd-vlcc',
    label: 'IBD — supertanker (LAB)',
    short: 'IBD tanker',
    sigma: 2.2e-9,
    oscillates: true,
    color: '#fb4934',
    platform: 'sea',
  },
  {
    id: 'cevns-747',
    label: 'CEvNS — 747 (Ge bolometer)',
    short: 'CEvNS 747',
    sigma: 1.13e-11,
    oscillates: false,
    color: '#fabd2f',
    platform: 'air',
  },
  {
    id: 'cevns-vlcc',
    label: 'CEvNS — supertanker (Ge bolometer)',
    short: 'CEvNS tanker',
    sigma: 3.0e-8,
    oscillates: false,
    color: '#fabd2f',
    platform: 'sea',
  },
  {
    // Appendix L quotes rates for a 1e18 nubar/s source while Appendix B gives
    // 1.44e18, so this effective cross section inherits that ~1.44x
    // conservatism by construction.
    id: 'spin-vlcc',
    label: 'Superradiant spin — supertanker (5 × 20 m spheres)',
    short: 'Spin flip',
    sigma: 6.49e-7,
    oscillates: false,
    color: '#8ec07c',
    platform: 'sea',
  },
  {
    id: 'bec',
    label: 'BEC superabsorption — 10¹⁹ atoms (17 µg)',
    short: 'BEC',
    sigma: 2.6e-6,
    oscillates: true,
    color: '#d3869b',
    platform: 'any',
  },
];

const DETECTOR_BY_ID = new Map(DETECTORS.map(d => [d.id, d]));

/** Existing sensors, for scale. */
const COMPARISONS = [
  { rangeKm: 6, label: 'SQUID magnetometer' },
  { rangeKm: 100, label: 'active sonar' },
];

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

/**
 * Powers of ten as SVG tspans rather than unicode superscripts: Literata has no
 * U+207B, so "10⁻²" would silently lose its minus sign and read as 10².
 */
const decadeLabel = (exp: number, fontSize: number) => {
  if (exp === 0) return <>1</>;
  if (exp === 1) return <>10</>;
  return <>10<tspan dy={-fontSize * 0.45} fontSize={fontSize * 0.78}>{exp}</tspan></>;
};

const significant = (x: number) =>
  x >= 10 ? x.toFixed(0)
    : x >= 1 ? x.toFixed(1)
      : x.toFixed(2);

/** Turn an events-per-hour figure into something a reader can feel. */
function formatRate(perHour: number) {
  if (perHour >= 1) return `${significant(perHour)}/hr`;
  const perDay = perHour * 24;
  if (perDay >= 1) return `${significant(perDay)}/day`;
  const days = 1 / perDay;
  if (days < 400) return `1 per ${significant(days)} d`;
  const years = days / 365.25;
  if (years < 1e3) return `1 per ${significant(years)} yr`;
  if (years < 1e6) return `1 per ${(years / 1e3).toFixed(0)}k yr`;
  return `1 per ${(years / 1e6).toFixed(0)}M yr`;
}

/* ------------------------------------------------------------------ */
/* Plot                                                                */
/* ------------------------------------------------------------------ */

export type NeutrinoRangePlotProps = {
  /** Which detector curves to draw, in legend order. */
  detectors: string[],
  /** Horizontal "is this militarily useful" line, events/hour. */
  threshold?: number,
  xMinKm?: number,
  xMaxKm?: number,
  /** Pin the vertical axis instead of fitting it to the visible curves. */
  yMinPerHour?: number,
  yMaxPerHour?: number,
  /** Vertical markers for the sensors the article compares against. */
  showComparisons?: boolean,
  /** Starting position of the range cursor, km. */
  initialRangeKm?: number,
  caption?: React.ReactNode,
};

const SAMPLE_COUNT = 260;

const NeutrinoRangePlot: React.FunctionComponent<NeutrinoRangePlotProps> = ({
  detectors,
  threshold = 1,
  xMinKm = 1,
  xMaxKm = 300,
  yMinPerHour,
  yMaxPerHour,
  showComparisons = true,
  initialRangeKm = 50,
  caption,
}) => {
  const [speedKn, setSpeedKn] = React.useState(REFERENCE_SPEED_KN);
  const [cursorKm, setCursorKm] = React.useState(initialRangeKm);
  const [oscillation, setOscillation] = React.useState(true);
  const [hidden, setHidden] = React.useState<ReadonlySet<string>>(new Set());

  const toggleDetector = (id: string) => setHidden(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const containerRef = React.useRef<HTMLDivElement>(null);
  // Start narrow and grow into the container. Starting wide would let the first
  // paint widen the page, and the observer would then measure that inflated
  // width and settle there.
  const [width, setWidth] = React.useState(320);
  const clipId = `nrp-clip-${React.useId()}`;

  React.useEffect(() => {
    const el = containerRef.current;
    if (el === null) return;
    setWidth(el.clientWidth);
    const observer = new ResizeObserver(entries => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shown = React.useMemo(
    () => detectors
      .map(id => DETECTOR_BY_ID.get(id))
      .filter((d): d is Detector => d !== undefined),
    [detectors],
  );

  // Suppression only depends on range, so it is worth caching across renders
  // of the speed slider.
  const suppressionAt = React.useMemo(() => {
    const cache = new Map<number, number>();
    return (rangeKm: number) => {
      const cached = cache.get(rangeKm);
      if (cached !== undefined) return cached;
      const value = oscillationSuppression(rangeKm);
      cache.set(rangeKm, value);
      return value;
    };
  }, []);

  const rateAt = React.useCallback(
    (detector: Detector, rangeKm: number, nuRate: number) => {
      const suppression = oscillation && detector.oscillates
        ? suppressionAt(rangeKm)
        : 1;
      return flux(nuRate, rangeKm) * detector.sigma * suppression * 3600;
    },
    [oscillation, suppressionAt],
  );

  const nuRate = sourceRate(speedKn);

  const logMinX = Math.log10(xMinKm);
  const logMaxX = Math.log10(xMaxKm);

  const series = React.useMemo(() => shown.map(detector => {
    const points: { km: number, perHour: number }[] = [];
    for (let i = 0; i <= SAMPLE_COUNT; i++) {
      const km = 10 ** (logMinX + (logMaxX - logMinX) * i / SAMPLE_COUNT);
      points.push({ km, perHour: rateAt(detector, km, nuRate) });
    }
    return { detector, points };
  }), [shown, rateAt, nuRate, logMinX, logMaxX]);

  // Fit the vertical axis to whole decades containing everything on screen.
  const [logMinY, logMaxY] = React.useMemo(() => {
    if (yMinPerHour !== undefined && yMaxPerHour !== undefined) {
      return [Math.log10(yMinPerHour), Math.log10(yMaxPerHour)];
    }
    let lo = Math.log10(threshold);
    let hi = Math.log10(threshold);
    for (const { points } of series) {
      for (const p of points) {
        if (p.perHour <= 0) continue;
        const l = Math.log10(p.perHour);
        if (l < lo) lo = l;
        if (l > hi) hi = l;
      }
    }
    return [
      yMinPerHour !== undefined ? Math.log10(yMinPerHour) : Math.floor(lo) - 0.35,
      yMaxPerHour !== undefined ? Math.log10(yMaxPerHour) : Math.ceil(hi) + 0.35,
    ];
  }, [series, threshold, yMinPerHour, yMaxPerHour]);

  const isNarrow = width < 520;
  const height = Math.round(Math.max(230, Math.min(400, width * 0.58)));
  const margin = {
    top: isNarrow ? 14 : 20,
    right: isNarrow ? 10 : 16,
    bottom: isNarrow ? 34 : 40,
    left: isNarrow ? 42 : 52,
  };
  const plotWidth = Math.max(10, width - margin.left - margin.right);
  const plotHeight = Math.max(10, height - margin.top - margin.bottom);

  const xOf = (km: number) =>
    margin.left + (Math.log10(km) - logMinX) / (logMaxX - logMinX) * plotWidth;
  const yOf = (perHour: number) => {
    const l = Math.log10(Math.max(perHour, 1e-300));
    const frac = (l - logMinY) / (logMaxY - logMinY);
    return margin.top + (1 - Math.min(Math.max(frac, -0.5), 1.5)) * plotHeight;
  };
  const kmOf = (x: number) =>
    10 ** (logMinX + (x - margin.left) / plotWidth * (logMaxX - logMinX));

  const xTicks = React.useMemo(() => {
    const ticks: number[] = [];
    for (let exp = Math.floor(logMinX); exp <= Math.ceil(logMaxX); exp++) {
      for (const mult of [1, 3]) {
        const value = mult * 10 ** exp;
        if (value >= xMinKm * 0.999 && value <= xMaxKm * 1.001) ticks.push(value);
      }
    }
    return ticks;
  }, [logMinX, logMaxX, xMinKm, xMaxKm]);

  const yTicks = React.useMemo(() => {
    const ticks: number[] = [];
    const span = Math.ceil(logMaxY) - Math.floor(logMinY);
    // Thin the labels out when the axis spans a lot of decades.
    const stride = span > 12 ? 3 : span > 7 ? 2 : 1;
    for (let exp = Math.ceil(logMinY); exp <= Math.floor(logMaxY); exp++) {
      if (((exp % stride) + stride) % stride === 0) ticks.push(exp);
    }
    return ticks;
  }, [logMinY, logMaxY]);

  const clampKm = (km: number) => Math.min(Math.max(km, xMinKm), xMaxKm);

  const handlePointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorKm(clampKm(kmOf(e.clientX - rect.left)));
  };

  const cursorX = xOf(cursorKm);
  const readouts = shown
    .filter(detector => !hidden.has(detector.id))
    .map(detector => ({
      detector,
      perHour: rateAt(detector, cursorKm, nuRate),
    }));

  const axisColor = '#665c54';
  const gridColor = '#3c3836';
  const tickColor = '#a89984';
  const labelColor = '#d5c4a1';
  const mutedColor = '#928374';

  const thresholdY = yOf(threshold);
  const thresholdVisible = thresholdY > margin.top && thresholdY < margin.top + plotHeight;

  return <figure className="d-block my-4 mx-auto" style={{ maxWidth: 'min(100%, 45rem)' }}>
    {/* overflow guard: keeps an oversized svg from ever widening what we measure */}
    <div ref={containerRef} style={{ width: '100%', overflow: 'hidden' }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ display: 'block', maxWidth: '100%', touchAction: 'pan-y', cursor: 'crosshair' }}
        onPointerDown={handlePointer}
        onPointerMove={e => { if (e.buttons > 0 || e.pointerType === 'mouse') handlePointer(e); }}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={margin.left} y={margin.top} width={plotWidth} height={plotHeight} />
          </clipPath>
        </defs>

        {/* horizontal decade gridlines */}
        {yTicks.map(exp => <g key={`y${exp}`}>
          <line
            x1={margin.left} x2={margin.left + plotWidth}
            y1={yOf(10 ** exp)} y2={yOf(10 ** exp)}
            stroke={gridColor} strokeWidth={1}
          />
          <text
            x={margin.left - 6} y={yOf(10 ** exp) + 3.5}
            textAnchor="end" fontSize={isNarrow ? 9 : 10.5} fill={tickColor}
          >{decadeLabel(exp, isNarrow ? 9 : 10.5)}</text>
        </g>)}

        {/* vertical gridlines */}
        {xTicks.map(km => <line
          key={`x${km}`}
          x1={xOf(km)} x2={xOf(km)}
          y1={margin.top} y2={margin.top + plotHeight}
          stroke={gridColor} strokeWidth={1}
        />)}

        {/* below-threshold shading */}
        {thresholdVisible && <>
          <rect
            x={margin.left} y={thresholdY}
            width={plotWidth} height={margin.top + plotHeight - thresholdY}
            fill="#1d2021" opacity={0.45}
          />
          <line
            x1={margin.left} x2={margin.left + plotWidth}
            y1={thresholdY} y2={thresholdY}
            stroke={mutedColor} strokeWidth={1} strokeDasharray="2 3"
          />
          {/* no room for this next to the curves on a phone; the shading carries it */}
          {!isNarrow && <text
            x={margin.left + 5} y={thresholdY + 11}
            fontSize={9.5} fill={mutedColor}
          >below {formatRate(threshold)} — not useful</text>}
        </>}

        {/* existing-sensor range markers */}
        {showComparisons && COMPARISONS
          .filter(c => c.rangeKm > xMinKm && c.rangeKm < xMaxKm)
          .map(c => <g key={c.label}>
            <line
              x1={xOf(c.rangeKm)} x2={xOf(c.rangeKm)}
              y1={margin.top} y2={margin.top + plotHeight}
              stroke={mutedColor} strokeWidth={1} strokeDasharray="1 4"
            />
            {!isNarrow && <text
              x={xOf(c.rangeKm) - 4} y={margin.top + 10}
              textAnchor="end" fontSize={9.5} fill={mutedColor}
            >{c.label}</text>}
          </g>)}

        {/* range cursor */}
        <line
          x1={cursorX} x2={cursorX}
          y1={margin.top} y2={margin.top + plotHeight}
          stroke={labelColor} strokeWidth={1} opacity={0.55}
        />

        {/* curves */}
        {series.filter(s => !hidden.has(s.detector.id)).map(({ detector, points }) => {
          const d = points
            .map((p, i) => `${i === 0 ? 'M' : 'L'}${xOf(p.km).toFixed(2)} ${yOf(p.perHour).toFixed(2)}`)
            .join('');
          return <path
            key={detector.id}
            d={d}
            fill="none"
            stroke={detector.color}
            strokeWidth={2}
            strokeDasharray={detector.platform === 'air' ? '5 4' : undefined}
            strokeLinejoin="round"
            clipPath={`url(#${clipId})`}
          />;
        })}

        {/* cursor dots */}
        {readouts.map(({ detector, perHour }) => {
          const y = yOf(perHour);
          if (y < margin.top - 2 || y > margin.top + plotHeight + 2) return null;
          return <circle
            key={detector.id}
            cx={cursorX} cy={y} r={3.2}
            fill="#282828" stroke={detector.color} strokeWidth={2}
          />;
        })}

        {/* frame */}
        <rect
          x={margin.left} y={margin.top}
          width={plotWidth} height={plotHeight}
          fill="none" stroke={axisColor} strokeWidth={1}
        />

        {/* x tick labels */}
        {xTicks.map(km => <text
          key={`xl${km}`}
          x={xOf(km)} y={margin.top + plotHeight + (isNarrow ? 13 : 15)}
          textAnchor="middle" fontSize={isNarrow ? 9 : 10.5} fill={tickColor}
        >{km >= 1 ? km : km.toString()}</text>)}

        <text
          x={margin.left + plotWidth / 2} y={height - 3}
          textAnchor="middle" fontSize={isNarrow ? 9.5 : 11} fill={labelColor}
        >range to submarine (km)</text>

        <text
          x={12} y={margin.top + plotHeight / 2}
          textAnchor="middle" fontSize={isNarrow ? 9.5 : 11} fill={labelColor}
          transform={`rotate(-90 12 ${margin.top + plotHeight / 2})`}
        >detections per hour</text>
      </svg>
    </div>

    {/* readout */}
    <div
      className="d-flex flex-wrap align-items-baseline gap-2 mt-1 mb-2"
      style={{ fontSize: '0.8rem', minHeight: '2.6rem' }}
    >
      <span style={{ color: labelColor, whiteSpace: 'nowrap' }}>
        at <strong>{cursorKm < 10 ? cursorKm.toFixed(1) : cursorKm.toFixed(0)} km</strong>:
      </span>
      {readouts.map(({ detector, perHour }) => <span
        key={detector.id}
        className="d-inline-flex align-items-center gap-1"
        style={{ whiteSpace: 'nowrap', opacity: perHour >= threshold ? 1 : 0.55 }}
      >
        <span style={{
          display: 'inline-block',
          width: '0.7rem', height: 0,
          borderTop: `2px ${detector.platform === 'air' ? 'dashed' : 'solid'} ${detector.color}`,
        }} />
        <span style={{ color: mutedColor }}>{detector.short}</span>
        <span style={{ color: labelColor }}>{formatRate(perHour)}</span>
      </span>)}
    </div>

    {/* controls */}
    <div className="d-flex flex-wrap align-items-center gap-3" style={{ fontSize: '0.8rem' }}>
      <label className="d-flex align-items-center gap-2 m-0" style={{ flex: '1 1 13rem' }}>
        <span style={{ color: mutedColor, whiteSpace: 'nowrap' }}>range</span>
        <input
          type="range"
          className="form-range"
          min={logMinX} max={logMaxX} step={0.005}
          value={Math.log10(cursorKm)}
          onChange={e => setCursorKm(clampKm(10 ** Number(e.target.value)))}
          style={{ flex: 1 }}
        />
      </label>
      <label className="d-flex align-items-center gap-2 m-0" style={{ flex: '1 1 13rem' }}>
        <span style={{ color: mutedColor, whiteSpace: 'nowrap' }}>
          patrol {speedKn.toFixed(1)} kn
        </span>
        <input
          type="range"
          className="form-range"
          min={0} max={16} step={0.5}
          value={speedKn}
          onChange={e => setSpeedKn(Number(e.target.value))}
          style={{ flex: 1 }}
        />
      </label>
      <label className="d-flex align-items-center gap-2 m-0" style={{ whiteSpace: 'nowrap' }}>
        <input
          type="checkbox"
          className="form-check-input m-0"
          checked={oscillation}
          onChange={e => setOscillation(e.target.checked)}
        />
        <span style={{ color: mutedColor }}>oscillation</span>
      </label>
    </div>

    {/* legend — click an entry to hide or show that curve */}
    <div
      className="d-flex flex-wrap align-items-center gap-3 mt-2"
      style={{ fontSize: '0.75rem' }}
    >
      {shown.map(detector => {
        const off = hidden.has(detector.id);
        return <button
          key={detector.id}
          type="button"
          onClick={() => toggleDetector(detector.id)}
          aria-pressed={!off}
          title={off ? 'show this curve' : 'hide this curve'}
          className="d-inline-flex align-items-center gap-2 p-0 border-0 bg-transparent"
          style={{
            color: off ? '#665c54' : mutedColor,
            fontSize: 'inherit',
            lineHeight: 1.3,
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <span style={{
            display: 'inline-block',
            width: '1.1rem', height: 0,
            borderTop: `2px ${detector.platform === 'air' ? 'dashed' : 'solid'} ${off ? '#504945' : detector.color}`,
          }} />
          <span style={{ textDecoration: off ? 'line-through' : undefined }}>
            {isNarrow ? detector.short : detector.label}
          </span>
        </button>;
      })}
      {hidden.size > 0 && <button
        type="button"
        onClick={() => setHidden(new Set())}
        className="p-0 border-0 bg-transparent text-decoration-underline"
        style={{ color: mutedColor, fontSize: 'inherit', cursor: 'pointer' }}
      >show all</button>}
    </div>

    {caption
      ? <figcaption className="figure-caption mt-2"><i>{caption}</i></figcaption>
      : null}
  </figure>;
};

export default NeutrinoRangePlot;
