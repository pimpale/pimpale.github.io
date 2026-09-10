import React, { useEffect, useRef } from 'react';
import { mat4, quat, vec3 } from 'gl-matrix';

import { createShader, createProgram } from '../utils/webgl';
import { TrackballCamera } from '../utils/camera';
import { VisibilityChecker } from '../utils/visibility';
import { palette } from '../styles/palette';

import subWireUrl from '../assets/neutrino_submarines/sub_wire.bin?url';
import subWireMeta from '../assets/neutrino_submarines/sub_wire.json';

/**
 * Article hero: a wireframe Ohio-class SSBN with antineutrinos streaming out
 * of the reactor compartment and straight through the hull, drawn as
 * bubble-chamber style tracks. Drag to spin (turntable: the sub can be
 * rotated but not tipped).
 *
 * The hull is a curated line list exported from the Blender model by
 * scripts/export_sub_wire.py (metres, +X bow, +Z up). Everything else is
 * generated here. No depth test: all geometry is translucent, with a dimming
 * cue for the far side of the hull.
 */

type NeutrinoSubmarineHeroProps = {
  className?: string,
  style?: React.CSSProperties,
};

/* ------------------------------------------------------------------ */
/* Tunables                                                            */
/* ------------------------------------------------------------------ */

/** Reactor compartment sits aft of the missile deck, which ends at x = -48. */
const REACTOR_POS: vec3 = [-57, 0, 0.5];
const REACTOR_JITTER = 3.5;                      // m, spread of emission points
const SCENE_CENTER: vec3 = [0, 0, 4];
const SUB_LENGTH = subWireMeta.max[0] - subWireMeta.min[0];

const VIEW_HALF_WIDTH = SUB_LENGTH / 2 * 1.12;   // m, hull fits the width broadside
const VIEW_DEPTH = 1200;                         // m, ortho near/far half-range
const INITIAL_TILT = 16 * Math.PI / 180;         // look slightly down onto the deck
const INITIAL_YAW = -32 * Math.PI / 180;         // three-quarter view to start
const AUTO_SPIN_RAD_PER_FRAME = 0.0012;
const MAX_DPR = 1.5;

// Bubble-chamber style tracks. Like a chamber photograph, each track appears
// all at once along its full length, lingers, fades out, and then flashes
// again in a fresh random direction. Tracks are suppressed near the canvas
// edge. Directions are hashed per track per cycle in the vertex shader, so
// the bubble buffer is static.
const TRACK_COUNT = 120;
const TRACK_COUNT_NARROW = 60;
const BUBBLES_PER_TRACK = 110;
const TRACK_PERIOD = 3.0;                        // s per flash cycle
const TRACK_RANGE = 220;                         // m, full track length
const TRACK_HOLD: [number, number] = [0.15, 0.6]; // fraction of the cycle where the fade-out runs
const BUBBLE_SCATTER = 0.3;                     // m, sideways wobble of bubbles
const BUBBLE_SIZE_PX: [number, number] = [1.2, 3.2];   // CSS px
const TRACK_ALPHA = 0.8;
const EDGE_FADE: [number, number] = [0.6, 0.97]; // NDC |x|,|y| where suppression starts/ends

/* ------------------------------------------------------------------ */
/* Shaders                                                             */
/* ------------------------------------------------------------------ */

const line_vs = `#version 300 es
in vec3 a_pos;

uniform mat4 u_mvp;

out float v_depth;      // clip z; positive is farther from the viewer

void main() {
  gl_Position = u_mvp * vec4(a_pos, 1.0);
  v_depth = gl_Position.z;
}
`;

const line_fs = `#version 300 es
precision highp float;

in float v_depth;

uniform vec4 u_color;       // straight alpha
uniform float u_depthDim;   // how much to dim the far side (0..1)
uniform float u_depthScale; // clip z -> metres

out vec4 o_color;

void main() {
  float depth = 1.0 - u_depthDim * smoothstep(-8.0, 8.0, v_depth * u_depthScale);
  float a = u_color.a * depth;
  o_color = vec4(u_color.rgb * a, a);   // premultiplied
}
`;

const bubble_vs = `#version 300 es
in vec3 a_origin;
in float a_track;     // track id, seeds the per-cycle direction
in float a_phase;     // offset of this track's cycle
in float a_u;         // 0..1 position along the track
in vec2 a_scatter;    // (angle, radius) sideways offset of this bubble
in float a_size;      // CSS px
in float a_bright;    // per-bubble brightness variation

uniform mat4 u_mvp;
uniform float u_time;
uniform float u_period;
uniform float u_range;
uniform vec2 u_hold;
uniform float u_pixelScale;
uniform vec2 u_edgeFade;

out float v_alpha;

float hash(float n) { return fract(sin(n) * 43758.5453123); }

void main() {
  float cycle = floor(a_phase + u_time / u_period);
  float s = fract(a_phase + u_time / u_period);

  // fresh isotropic direction every cycle
  float seed = a_track * 7.13 + cycle * 3.71;
  float z = hash(seed) * 2.0 - 1.0;
  float t = hash(seed + 1.7) * 6.2831853;
  float rxy = sqrt(max(0.0, 1.0 - z * z));
  vec3 dir = vec3(rxy * cos(t), rxy * sin(t), z);

  // perpendicular frame for the scatter
  vec3 helper = abs(dir.z) < 0.9 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
  vec3 side = normalize(cross(dir, helper));
  vec3 up = cross(dir, side);
  vec3 scatter = (side * cos(a_scatter.x) + up * sin(a_scatter.x)) * a_scatter.y;

  vec3 p = a_origin + dir * (a_u * u_range) + scatter;

  // the whole track flashes in at once, holds, then fades
  float flash = smoothstep(0.0, 0.02, s) * (1.0 - smoothstep(u_hold.x, u_hold.y, s));

  gl_Position = u_mvp * vec4(p, 1.0);

  // suppress near the edge of the viewbox
  vec2 ndc = abs(gl_Position.xy / gl_Position.w);
  float edge = 1.0 - smoothstep(u_edgeFade.x, u_edgeFade.y, max(ndc.x, ndc.y));

  v_alpha = flash * edge * a_bright;
  gl_PointSize = a_size * u_pixelScale;
}
`;

const bubble_fs = `#version 300 es
precision highp float;

in float v_alpha;
uniform vec4 u_color;
out vec4 o_color;

void main() {
  // soft disc
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float disc = 1.0 - smoothstep(0.45, 1.0, d);
  float a = u_color.a * v_alpha * disc;
  o_color = vec4(u_color.rgb * a, a);   // premultiplied
}
`;

/* ------------------------------------------------------------------ */
/* Geometry                                                            */
/* ------------------------------------------------------------------ */

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/** Unquantize the exported int16 line list into world-space metres. */
function decodeSubWire(buf: ArrayBuffer): Float32Array {
  const q = new Int16Array(buf);
  const out = new Float32Array(q.length);
  const { min, max } = subWireMeta;
  for (let i = 0; i < q.length; i++) {
    const axis = i % 3;
    out[i] = min[axis] + (q[i] + 32768) / 65535 * (max[axis] - min[axis]);
  }
  return out;
}

const BUBBLE_STRIDE = 10; // floats per bubble: origin3 track phase u scatter2 size bright

/**
 * One point sprite per bubble. Bubbles on a track share origin, id, and
 * phase; the direction is derived in the shader each cycle. Bubbles are spaced
 * semi-randomly along the track with a little sideways scatter so the trail
 * looks like a chain of bubbles rather than a line.
 */
function buildBubbles(trackCount: number): Float32Array {
  const out = new Float32Array(trackCount * BUBBLES_PER_TRACK * BUBBLE_STRIDE);
  let o = 0;
  for (let i = 0; i < trackCount; i++) {
    // emission point somewhere in the reactor compartment
    const origin = [
      REACTOR_POS[0] + (Math.random() - 0.5) * 2 * REACTOR_JITTER,
      REACTOR_POS[1] + (Math.random() - 0.5) * 1.2 * REACTOR_JITTER,
      REACTOR_POS[2] + (Math.random() - 0.5) * 1.2 * REACTOR_JITTER,
    ];
    const phase = Math.random();

    for (let b = 0; b < BUBBLES_PER_TRACK; b++) {
      out.set(origin, o);
      out[o + 3] = i;
      out[o + 4] = phase;
      out[o + 5] = (b + Math.random() * 0.9) / BUBBLES_PER_TRACK;   // jittered spacing
      out[o + 6] = Math.random() * Math.PI * 2;                       // scatter angle
      out[o + 7] = Math.random() * BUBBLE_SCATTER;                    // scatter radius
      out[o + 8] = BUBBLE_SIZE_PX[0] + Math.random() * (BUBBLE_SIZE_PX[1] - BUBBLE_SIZE_PX[0]);
      out[o + 9] = 0.5 + Math.random() * 0.5;
      o += BUBBLE_STRIDE;
    }
  }
  return out;
}

function makeBuffer(gl: WebGL2RenderingContext, data: Float32Array): WebGLBuffer {
  const buf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return buf;
}

/**
 * Model transform into the trackball's frame: the exported model is +X bow,
 * +Z up, but the trackball starts with screen-up = +Y and the viewer on +Z.
 * Also bakes in the initial three-quarter view and centres the scene.
 */
function buildModelMatrix(): mat4 {
  const m = mat4.create();
  mat4.rotateX(m, m, INITIAL_TILT);
  mat4.rotateY(m, m, INITIAL_YAW);
  mat4.rotateX(m, m, -Math.PI / 2);
  mat4.translate(m, m, vec3.negate(vec3.create(), SCENE_CENTER));
  return m;
}

/**
 * The sub's vertical axis as it appears in view space after the initial tilt.
 * Both the auto-spin and the drag lock use it, so the sub behaves like a
 * turntable: it can be spun but never tipped up or down.
 */
const TURNTABLE_AXIS: vec3 = [0, Math.cos(INITIAL_TILT), Math.sin(INITIAL_TILT)];

function buildAutoSpin(): quat {
  return quat.setAxisAngle(quat.create(), TURNTABLE_AXIS, AUTO_SPIN_RAD_PER_FRAME);
}

function orthoFor(aspect: number) {
  return {
    left: -VIEW_HALF_WIDTH,
    right: VIEW_HALF_WIDTH,
    bottom: -VIEW_HALF_WIDTH / aspect,
    top: VIEW_HALF_WIDTH / aspect,
    near: -VIEW_DEPTH,
    far: VIEW_DEPTH,
  };
}

/* ------------------------------------------------------------------ */
/* Renderer                                                            */
/* ------------------------------------------------------------------ */

class HeroRenderer {
  private gl: WebGL2RenderingContext;
  private lineProgram: WebGLProgram;
  private bubbleProgram: WebGLProgram;

  private bubbleVao: WebGLVertexArrayObject;
  private bubbleCount: number;
  private subVao: WebGLVertexArrayObject | null = null;
  private subCount = 0;

  private model = buildModelMatrix();
  private mvp = mat4.create();

  private lineU: {
    mvp: WebGLUniformLocation, color: WebGLUniformLocation,
    depthDim: WebGLUniformLocation, depthScale: WebGLUniformLocation,
  };
  private bubbleU: {
    mvp: WebGLUniformLocation, time: WebGLUniformLocation, period: WebGLUniformLocation,
    range: WebGLUniformLocation, hold: WebGLUniformLocation, pixelScale: WebGLUniformLocation,
    edgeFade: WebGLUniformLocation, color: WebGLUniformLocation,
  };

  private hullColor = hexToRgb(palette.fg1);
  private bubbleColor = hexToRgb(palette.fg4);

  constructor(gl: WebGL2RenderingContext, trackCount: number) {
    this.gl = gl;

    const program = (vs: string, fs: string) => {
      const p = createProgram(gl, [
        createShader(gl, gl.VERTEX_SHADER, vs),
        createShader(gl, gl.FRAGMENT_SHADER, fs),
      ]);
      if (!p) throw new Error('shader program failed to link');
      return p;
    };
    this.lineProgram = program(line_vs, line_fs);
    this.bubbleProgram = program(bubble_vs, bubble_fs);

    const lu = (name: string) => gl.getUniformLocation(this.lineProgram, name)!;
    this.lineU = {
      mvp: lu('u_mvp'), color: lu('u_color'),
      depthDim: lu('u_depthDim'), depthScale: lu('u_depthScale'),
    };
    const bu = (name: string) => gl.getUniformLocation(this.bubbleProgram, name)!;
    this.bubbleU = {
      mvp: bu('u_mvp'), time: bu('u_time'), period: bu('u_period'),
      range: bu('u_range'), hold: bu('u_hold'), pixelScale: bu('u_pixelScale'),
      edgeFade: bu('u_edgeFade'), color: bu('u_color'),
    };

    const bubbles = buildBubbles(trackCount);
    this.bubbleCount = bubbles.length / BUBBLE_STRIDE;
    this.bubbleVao = gl.createVertexArray()!;
    gl.bindVertexArray(this.bubbleVao);
    makeBuffer(gl, bubbles);
    const stride = BUBBLE_STRIDE * 4;
    const attr = (name: string, size: number, offset: number) => {
      const loc = gl.getAttribLocation(this.bubbleProgram, name);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, stride, offset * 4);
    };
    attr('a_origin', 3, 0);
    attr('a_track', 1, 3);
    attr('a_phase', 1, 4);
    attr('a_u', 1, 5);
    attr('a_scatter', 2, 6);
    attr('a_size', 1, 8);
    attr('a_bright', 1, 9);
    gl.bindVertexArray(null);

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    // Everything is premultiplied, composited "over" the page background.
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);
  }

  setSubmarine(positions: Float32Array) {
    const gl = this.gl;
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    makeBuffer(gl, positions);
    const loc = gl.getAttribLocation(this.lineProgram, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);
    this.subVao = vao;
    this.subCount = positions.length / 3;
  }

  /** `viewProjection` comes from TrackballCamera.getTrackballCameraMatrix. */
  render(time: number, viewProjection: mat4, width: number, height: number, dpr: number) {
    const gl = this.gl;
    gl.viewport(0, 0, width, height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    mat4.multiply(this.mvp, viewProjection, this.model);

    // hull, far side dimmed
    if (this.subVao) {
      gl.useProgram(this.lineProgram);
      gl.uniformMatrix4fv(this.lineU.mvp, false, this.mvp);
      gl.uniform1f(this.lineU.depthScale, VIEW_DEPTH);
      gl.uniform4f(this.lineU.color, ...this.hullColor, 0.6);
      gl.uniform1f(this.lineU.depthDim, 0.55);
      gl.bindVertexArray(this.subVao);
      gl.drawArrays(gl.LINES, 0, this.subCount);
    }

    // antineutrino tracks
    gl.useProgram(this.bubbleProgram);
    gl.uniformMatrix4fv(this.bubbleU.mvp, false, this.mvp);
    gl.uniform1f(this.bubbleU.time, time);
    gl.uniform1f(this.bubbleU.period, TRACK_PERIOD);
    gl.uniform1f(this.bubbleU.range, TRACK_RANGE);
    gl.uniform2f(this.bubbleU.hold, TRACK_HOLD[0], TRACK_HOLD[1]);
    gl.uniform1f(this.bubbleU.pixelScale, dpr);
    gl.uniform2f(this.bubbleU.edgeFade, EDGE_FADE[0], EDGE_FADE[1]);
    gl.uniform4f(this.bubbleU.color, ...this.bubbleColor, TRACK_ALPHA);
    gl.bindVertexArray(this.bubbleVao);
    gl.drawArrays(gl.POINTS, 0, this.bubbleCount);

    gl.bindVertexArray(null);
  }

  cleanup() {
    // Deliberately no loseContext(): React StrictMode remounts the effect and
    // getContext would hand the fresh mount the same, now lost, context.
    const gl = this.gl;
    gl.deleteProgram(this.lineProgram);
    gl.deleteProgram(this.bubbleProgram);
    gl.deleteVertexArray(this.bubbleVao);
    if (this.subVao) gl.deleteVertexArray(this.subVao);
  }
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

const NeutrinoSubmarineHero: React.FunctionComponent<NeutrinoSubmarineHeroProps> = props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const narrow = canvas.clientWidth < 576;

    const gl = canvas.getContext('webgl2', { alpha: true, antialias: true, premultipliedAlpha: true });
    let renderer: HeroRenderer | null = null;
    if (gl) {
      try {
        renderer = new HeroRenderer(gl, narrow ? TRACK_COUNT_NARROW : TRACK_COUNT);
      } catch (e) {
        console.error('NeutrinoSubmarineHero: WebGL setup failed', e);
      }
    }

    const camera = new TrackballCamera(canvas, {
      ortho: orthoFor(2),
      rotation: reducedMotion ? quat.create() : buildAutoSpin(),
      lockRotationAxis: TURNTABLE_AXIS,
    });

    // --- sizing --------------------------------------------------------
    let width = 1, height = 1, dpr = 1, needsFrame = true;
    const resize = () => {
      const w = canvas.clientWidth;
      const aspect = w < 576 ? 1.25 : w < 992 ? 1.8 : 2.3;
      const h = Math.round(w / aspect);
      canvas.style.height = `${h}px`;
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = Math.max(1, Math.round(w * dpr));
      height = Math.max(1, Math.round(h * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      camera.setOrtho(orthoFor(width / height));
      needsFrame = true;
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // --- model ---------------------------------------------------------
    let cancelled = false;
    if (renderer) {
      fetch(subWireUrl)
        .then(r => r.arrayBuffer())
        .then(buf => {
          if (cancelled || !renderer) return;
          renderer.setSubmarine(decodeSubWire(buf));
          needsFrame = true;
        })
        .catch(e => console.error('NeutrinoSubmarineHero: failed to load hull', e));
    }

    // --- loop ----------------------------------------------------------
    const visibility = new VisibilityChecker(canvas);
    const loadedAt = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!renderer) return;
      const visible = visibility.isVisible();
      // Under reduced motion the scene only redraws while it is being dragged;
      // the camera's per-frame spin is disabled above.
      if ((visible && !reducedMotion) || needsFrame || camera.isDragging()) {
        needsFrame = false;
        const t = reducedMotion ? 0.35 * TRACK_PERIOD : (now - loadedAt) / 1000;
        renderer.render(t, camera.getTrackballCameraMatrix(width, height), width, height, dpr);
        camera.update();
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibility.cleanup();
      camera.cleanup();
      renderer?.cleanup();
    };
  }, []);

  return <figure className={`d-block my-4 ${props.className ?? ''}`} style={props.style}>
    <canvas
      ref={canvasRef}
      aria-label="Wireframe of an Ohio-class ballistic missile submarine emitting antineutrinos in all directions, which pass through the hull unimpeded."
      style={{
        display: 'block',
        width: '100%',
        cursor: 'grab',
        userSelect: 'none',
      }}
    />
    <figcaption className="figure-caption mt-2 text-end"><i>Drag to rotate</i></figcaption>
  </figure>;
};

export default NeutrinoSubmarineHero;
