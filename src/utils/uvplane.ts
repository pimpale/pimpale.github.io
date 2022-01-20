import { vec3 } from 'gl-matrix';
import assert from '../utils/assert';

export function genXYPlane(xseg: number, yseg: number): vec3[] {
  assert(xseg > 0);
  assert(yseg > 0);

  let vertexes: vec3[] = [];

  for (let xi = 0; xi < xseg; xi++) {
    const x = xi / xseg;
    const nx = (xi+1) / xseg;
    for (let yi = 0; yi <= yseg; yi++) {
      const y = yi / yseg;
      const ny = (yi+1) / yseg;

      // add two triangles

      // upper triangle
      vertexes.push(vec3.fromValues(x, y, 0));
      vertexes.push(vec3.fromValues(nx, y, 0));
      vertexes.push(vec3.fromValues(x, ny, 0));
      // lower triangle
      vertexes.push(vec3.fromValues(nx, y, 0));
      vertexes.push(vec3.fromValues(nx, ny, 0));
      vertexes.push(vec3.fromValues(x, ny, 0));
    }
  }

  return vertexes;
}
