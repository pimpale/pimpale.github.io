import React from "react";
import { createShader, createProgram } from '../utils/webgl';
import { TrackballCamera } from '../utils/camera';
import { quat, vec3 } from 'gl-matrix';
import { colorScheme } from "../utils/colorscheme";

import { genIcosahedron } from '../utils/icosphere';
import { VisibilityChecker } from "../utils/visibility";
import chroma from "chroma-js";
import { load } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';

type CelshadingDemoProps = {
  style?: React.CSSProperties,
  className?: string
  width: number,
  height: number
}

type ShapeType = 'cube' | 'icosahedron' | 'torus' | 'custom';

// Gruvbox colors
const gruvboxTheme = colorScheme();

const vs = `#version 300 es
layout(location=0) in vec3 a_position;
layout(location=1) in vec2 a_barycenter;
layout(location=2) in vec3 a_normal;

uniform mat4 u_worldViewProjection;
uniform mat4 u_world;

out vec2 v_barycenter;
out vec3 v_normal;

void main() {
   gl_Position = u_worldViewProjection * vec4(a_position, 1.0);
   v_barycenter = a_barycenter;
   v_normal = mat3(u_world) * a_normal;
}
`;

const fs = `#version 300 es
precision highp float;

in vec2 v_barycenter;
in vec3 v_normal;

uniform vec3 u_faceColor;
uniform vec3 u_edgeColor;

out vec4 v_outColor;

float gridFactor (vec2 vBC, float width) {
  vec3 bary = vec3(vBC.x, vBC.y, 1.0 - vBC.x - vBC.y);
  vec3 d = fwidth(bary);
  vec3 a3 = smoothstep(d * (width - 0.5), d * (width + 0.5), bary);
  return min(min(a3.x, a3.y), a3.z);
}

void main() {
  // simple cel shading: 2 levels based on normal facing up
  vec3 lightDir = normalize(vec3(0.5, 1.0, 0.5));
  float ndotl = dot(normalize(v_normal), lightDir);
  float shade = ndotl > 0.0 ? 1.0 : 0.7;
  
  float edge = 1.0 - gridFactor(v_barycenter, 1.5);
  vec3 color = mix(u_faceColor * shade, u_edgeColor, edge);
  v_outColor = vec4(color, 1.0);
}
`;

// Generate cube vertices
function genCube(): { positions: vec3[], normals: vec3[] } {
  const positions: vec3[] = [];
  const normals: vec3[] = [];

  const faces = [
    // Front
    { verts: [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]], normal: [0, 0, 1] },
    // Back
    { verts: [[1, -1, -1], [-1, -1, -1], [-1, 1, -1], [1, 1, -1]], normal: [0, 0, -1] },
    // Top
    { verts: [[-1, 1, 1], [1, 1, 1], [1, 1, -1], [-1, 1, -1]], normal: [0, 1, 0] },
    // Bottom
    { verts: [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]], normal: [0, -1, 0] },
    // Right
    { verts: [[1, -1, 1], [1, -1, -1], [1, 1, -1], [1, 1, 1]], normal: [1, 0, 0] },
    // Left
    { verts: [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]], normal: [-1, 0, 0] },
  ];

  for (const face of faces) {
    const [v0, v1, v2, v3] = face.verts;
    const n = face.normal;
    const scale = 0.5;

    // Triangle 1
    positions.push(vec3.fromValues(v0[0] * scale, v0[1] * scale, v0[2] * scale));
    positions.push(vec3.fromValues(v1[0] * scale, v1[1] * scale, v1[2] * scale));
    positions.push(vec3.fromValues(v2[0] * scale, v2[1] * scale, v2[2] * scale));
    normals.push(vec3.fromValues(n[0], n[1], n[2]));
    normals.push(vec3.fromValues(n[0], n[1], n[2]));
    normals.push(vec3.fromValues(n[0], n[1], n[2]));

    // Triangle 2
    positions.push(vec3.fromValues(v0[0] * scale, v0[1] * scale, v0[2] * scale));
    positions.push(vec3.fromValues(v2[0] * scale, v2[1] * scale, v2[2] * scale));
    positions.push(vec3.fromValues(v3[0] * scale, v3[1] * scale, v3[2] * scale));
    normals.push(vec3.fromValues(n[0], n[1], n[2]));
    normals.push(vec3.fromValues(n[0], n[1], n[2]));
    normals.push(vec3.fromValues(n[0], n[1], n[2]));
  }

  return { positions, normals };
}

// Generate torus vertices
function genTorus(majorRadius: number = 0.5, minorRadius: number = 0.2, majorSegs: number = 24, minorSegs: number = 16): { positions: vec3[], normals: vec3[] } {
  const positions: vec3[] = [];
  const normals: vec3[] = [];

  for (let i = 0; i < majorSegs; i++) {
    for (let j = 0; j < minorSegs; j++) {
      const theta1 = (i / majorSegs) * 2 * Math.PI;
      const theta2 = ((i + 1) / majorSegs) * 2 * Math.PI;
      const phi1 = (j / minorSegs) * 2 * Math.PI;
      const phi2 = ((j + 1) / minorSegs) * 2 * Math.PI;

      const getPoint = (theta: number, phi: number): vec3 => {
        const x = (majorRadius + minorRadius * Math.cos(phi)) * Math.cos(theta);
        const y = (majorRadius + minorRadius * Math.cos(phi)) * Math.sin(theta);
        const z = minorRadius * Math.sin(phi);
        return vec3.fromValues(x, y, z);
      };

      const getNormal = (theta: number, phi: number): vec3 => {
        const x = Math.cos(phi) * Math.cos(theta);
        const y = Math.cos(phi) * Math.sin(theta);
        const z = Math.sin(phi);
        return vec3.fromValues(x, y, z);
      };

      const p00 = getPoint(theta1, phi1);
      const p10 = getPoint(theta2, phi1);
      const p01 = getPoint(theta1, phi2);
      const p11 = getPoint(theta2, phi2);

      const n00 = getNormal(theta1, phi1);
      const n10 = getNormal(theta2, phi1);
      const n01 = getNormal(theta1, phi2);
      const n11 = getNormal(theta2, phi2);

      // Triangle 1
      positions.push(p00, p10, p11);
      normals.push(n00, n10, n11);

      // Triangle 2
      positions.push(p00, p11, p01);
      normals.push(n00, n11, n01);
    }
  }

  return { positions, normals };
}

// Get icosahedron with normals
function genIcosahedronWithNormals(): { positions: vec3[], normals: vec3[] } {
  const positions = genIcosahedron();
  const normals: vec3[] = [];

  // For icosahedron, normals point outward from center (since it's centered at origin)
  for (const pos of positions) {
    const normal = vec3.normalize(vec3.create(), pos);
    normals.push(normal);
  }

  return { positions, normals };
}

// Add barycentric coordinates to vertices
function addBarycentricCoords(positions: vec3[]): number[] {
  const data: number[] = [];
  const baryCoords = [
    [1, 0],  // First vertex of triangle
    [0, 1],  // Second vertex
    [0, 0],  // Third vertex (1 - b1 - b2 = 1)
  ];

  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    const bary = baryCoords[i % 3];
    data.push(pos[0], pos[1], pos[2], bary[0], bary[1]);
  }

  return data;
}

// Combine positions, barycentrics, and normals into interleaved buffer
function createInterleavedBuffer(positions: vec3[], normals: vec3[]): Float32Array {
  const data: number[] = [];
  const baryCoords = [
    [1, 0],
    [0, 1],
    [0, 0],
  ];

  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    const normal = normals[i];
    const bary = baryCoords[i % 3];
    // position (3) + barycenter (2) + normal (3) = 8 floats per vertex
    data.push(pos[0], pos[1], pos[2], bary[0], bary[1], normal[0], normal[1], normal[2]);
  }

  return new Float32Array(data);
}

type CelshadingDemoState = {
  selectedShape: ShapeType;
  customMeshName: string | null;
}

type MeshData = {
  positions: vec3[];
  normals: vec3[];
};

class CelshadingDemo extends React.Component<CelshadingDemoProps, CelshadingDemoState> {
  private canvas = React.createRef<HTMLCanvasElement>();
  private fileInput = React.createRef<HTMLInputElement>();
  private gl!: WebGL2RenderingContext;
  private program!: WebGLProgram;

  private camera!: TrackballCamera;
  private vis!: VisibilityChecker;

  private worldViewProjectionLoc!: WebGLUniformLocation;
  private worldLoc!: WebGLUniformLocation;
  private faceColorLoc!: WebGLUniformLocation;
  private edgeColorLoc!: WebGLUniformLocation;

  private buffer!: WebGLBuffer;
  private vertexCount: number = 0;

  private customMesh: MeshData | null = null;

  private requestID!: number;

  constructor(props: CelshadingDemoProps) {
    super(props);
    this.state = {
      selectedShape: 'icosahedron',
      customMeshName: null
    };
  }

  componentDidMount() {
    // init camera
    this.camera = new TrackballCamera(
      this.canvas.current!,
      {
        rotation: quat.fromEuler(quat.create(), 0, 0.1, 0),
        enableZoom: true,
      }
    );
    this.vis = new VisibilityChecker(this.canvas.current!);

    // get webgl
    this.gl = this.canvas.current!.getContext('webgl2')!;

    // Enable depth testing for opaque rendering
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.program = createProgram(
      this.gl,
      [
        createShader(this.gl, this.gl.VERTEX_SHADER, vs),
        createShader(this.gl, this.gl.FRAGMENT_SHADER, fs),
      ]
    )!;

    this.worldViewProjectionLoc = this.gl.getUniformLocation(this.program, "u_worldViewProjection")!;
    this.worldLoc = this.gl.getUniformLocation(this.program, "u_world")!;
    this.faceColorLoc = this.gl.getUniformLocation(this.program, "u_faceColor")!;
    this.edgeColorLoc = this.gl.getUniformLocation(this.program, "u_edgeColor")!;

    this.buffer = this.gl.createBuffer()!;

    this.gl.useProgram(this.program);

    // Set initial colors (gruvbox theme)
    this.gl.uniform3fv(this.faceColorLoc, chroma(gruvboxTheme.blue).gl().slice(0, 3));
    this.gl.uniform3fv(this.edgeColorLoc, chroma(gruvboxTheme.fg1).gl().slice(0, 3));

    // Load initial shape
    this.loadShape(this.state.selectedShape);

    // start animation loop
    this.animationLoop();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.requestID!);
    this.camera.cleanup();
    this.vis.cleanup();
  }

  loadShape = (shape: ShapeType) => {
    let positions: vec3[];
    let normals: vec3[];

    switch (shape) {
      case 'cube':
        const cube = genCube();
        positions = cube.positions;
        normals = cube.normals;
        break;
      case 'torus':
        const torus = genTorus();
        positions = torus.positions;
        normals = torus.normals;
        break;
      case 'custom':
        if (!this.customMesh) {
          console.warn('No custom mesh loaded');
          return;
        }
        positions = this.customMesh.positions;
        normals = this.customMesh.normals;
        break;
      case 'icosahedron':
      default:
        const ico = genIcosahedronWithNormals();
        positions = ico.positions;
        normals = ico.normals;
        break;
    }

    const bufferData = createInterleavedBuffer(positions, normals);
    this.vertexCount = positions.length;

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, bufferData, this.gl.STATIC_DRAW);

    // Setup vertex attributes
    const positionLoc = 0;
    const barycenterLoc = 1;
    const normalLoc = 2;

    const stride = 8 * 4; // 8 floats * 4 bytes

    this.gl.enableVertexAttribArray(positionLoc);
    this.gl.vertexAttribPointer(positionLoc, 3, this.gl.FLOAT, false, stride, 0);

    this.gl.enableVertexAttribArray(barycenterLoc);
    this.gl.vertexAttribPointer(barycenterLoc, 2, this.gl.FLOAT, false, stride, 3 * 4);

    this.gl.enableVertexAttribArray(normalLoc);
    this.gl.vertexAttribPointer(normalLoc, 3, this.gl.FLOAT, false, stride, 5 * 4);
  }

  handleShapeChange = (shape: ShapeType) => {
    if (shape === 'custom' && !this.customMesh) {
      // Trigger file input if no custom mesh is loaded
      this.fileInput.current?.click();
      return;
    }
    this.setState({ selectedShape: shape });
    this.loadShape(shape);
  }

  handleFileLoad = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const gltf = await load(file, GLTFLoader);
      const meshData = this.extractMeshFromGLTF(gltf);
      
      if (meshData) {
        this.customMesh = meshData;
        this.setState({ selectedShape: 'custom', customMeshName: file.name });
        this.loadShape('custom');
      } else {
        console.error('No mesh data found in GLTF');
      }
    } catch (error) {
      console.error('Error loading GLTF:', error);
    }

    // Reset file input so same file can be loaded again
    event.target.value = '';
  }

  extractMeshFromGLTF = (gltf: any): MeshData | null => {
    const positions: vec3[] = [];
    const normals: vec3[] = [];

    // Find all meshes in the GLTF
    const meshes = gltf.meshes || [];
    
    for (const mesh of meshes) {
      for (const primitive of mesh.primitives || []) {
        const positionAccessor = primitive.attributes?.POSITION;
        const normalAccessor = primitive.attributes?.NORMAL;
        const indices = primitive.indices;

        if (!positionAccessor?.value) continue;

        const posData = positionAccessor.value as Float32Array;
        const normData = normalAccessor?.value as Float32Array | undefined;
        const indexData = indices?.value as Uint16Array | Uint32Array | undefined;

        if (indexData) {
          // Indexed geometry - expand to non-indexed
          for (let i = 0; i < indexData.length; i++) {
            const idx = indexData[i];
            positions.push(vec3.fromValues(
              posData[idx * 3],
              posData[idx * 3 + 1],
              posData[idx * 3 + 2]
            ));

            if (normData) {
              normals.push(vec3.fromValues(
                normData[idx * 3],
                normData[idx * 3 + 1],
                normData[idx * 3 + 2]
              ));
            }
          }
        } else {
          // Non-indexed geometry
          for (let i = 0; i < posData.length; i += 3) {
            positions.push(vec3.fromValues(posData[i], posData[i + 1], posData[i + 2]));
            
            if (normData) {
              normals.push(vec3.fromValues(normData[i], normData[i + 1], normData[i + 2]));
            }
          }
        }
      }
    }

    if (positions.length === 0) return null;

    // Generate normals if not provided (flat shading)
    if (normals.length === 0) {
      for (let i = 0; i < positions.length; i += 3) {
        const v0 = positions[i];
        const v1 = positions[i + 1];
        const v2 = positions[i + 2];
        
        const edge1 = vec3.subtract(vec3.create(), v1, v0);
        const edge2 = vec3.subtract(vec3.create(), v2, v0);
        const normal = vec3.normalize(vec3.create(), vec3.cross(vec3.create(), edge1, edge2));
        
        normals.push(vec3.clone(normal), vec3.clone(normal), vec3.clone(normal));
      }
    }

    // Normalize the mesh to fit in unit bounds
    const normalized = this.normalizeMesh(positions);

    return { positions: normalized, normals };
  }

  normalizeMesh = (positions: vec3[]): vec3[] => {
    // Find bounding box
    const min = vec3.fromValues(Infinity, Infinity, Infinity);
    const max = vec3.fromValues(-Infinity, -Infinity, -Infinity);

    for (const pos of positions) {
      vec3.min(min, min, pos);
      vec3.max(max, max, pos);
    }

    // Calculate center and scale
    const center = vec3.scale(vec3.create(), vec3.add(vec3.create(), min, max), 0.5);
    const size = vec3.subtract(vec3.create(), max, min);
    const maxDim = Math.max(size[0], size[1], size[2]);
    const scale = maxDim > 0 ? 1.0 / maxDim : 1.0;

    // Center and scale positions
    return positions.map(pos => {
      const centered = vec3.subtract(vec3.create(), pos, center);
      return vec3.scale(vec3.create(), centered, scale);
    });
  }

  animationLoop = () => {
    this.requestID = window.requestAnimationFrame(this.animationLoop);

    this.camera.update();

    // Skip render if not visible
    if (!this.vis.isVisible()) {
      return;
    }

    // Clear with gruvbox background
    const bg0 = chroma(gruvboxTheme.bg0).gl().slice(0, 3);
    this.gl.clearColor(bg0[0], bg0[1], bg0[2], 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // set uniform
    const worldViewProjectionMat = this.camera.getTrackballCameraMatrix(this.props.width, this.props.height);
    this.gl.uniformMatrix4fv(this.worldViewProjectionLoc, false, worldViewProjectionMat);

    // For world matrix (used for normals), we just need the rotation part
    // Since we're using orthographic and the camera just rotates, we can reuse worldViewProjectionMat
    this.gl.uniformMatrix4fv(this.worldLoc, false, worldViewProjectionMat);

    // draw triangles
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexCount);
  }

  render() {
    const { selectedShape, customMeshName } = this.state;
    const builtInShapes: ShapeType[] = ['cube', 'icosahedron', 'torus'];

    return (
      <div style={this.props.style} className={this.props.className}>
        <canvas
          ref={this.canvas}
          height={this.props.height}
          width={this.props.width}
          style={{ display: 'block', margin: '0 auto' }}
        />
        <input
          ref={this.fileInput}
          type="file"
          accept=".gltf,.glb"
          onChange={this.handleFileLoad}
          style={{ display: 'none' }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginTop: '1rem',
          fontFamily: 'monospace',
          flexWrap: 'wrap'
        }}>
          {builtInShapes.map(shape => (
            <button
              key={shape}
              onClick={() => this.handleShapeChange(shape)}
              className={`btn btn-secondary ${selectedShape === shape ? 'active' : ''}`}
              style={{
                transition: 'all 0.15s ease'
              }}
            >
              {shape}
            </button>
          ))}
          <button
            onClick={() => this.fileInput.current?.click()}
            className={`btn btn-secondary ${selectedShape === 'custom' ? 'active' : ''}`}
            style={{
              transition: 'all 0.15s ease'
            }}
          >
            {customMeshName ? customMeshName : 'load gltf...'}
          </button>
        </div>
      </div>
    );
  }
}

export default CelshadingDemo;

