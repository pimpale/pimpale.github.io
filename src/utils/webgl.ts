// code from https://webgl2fundamentals.org/webgl/lessons/webgl-fundamentals.html



export function createShader(gl: WebGL2RenderingContext, shader_type: number, source: string) {
  const shader = gl.createShader(shader_type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

export function createProgram(gl: WebGL2RenderingContext, shaders: WebGLShader[]) {
  const program = gl.createProgram()!;
  for (const shader of shaders) {
    gl.attachShader(program, shader);
  }

  gl.linkProgram(program);
  const linkSuccess = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linkSuccess) {
    let errorMessage = "";
    for (const shader of shaders) {
      const shaderSuccess = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (!shaderSuccess) {
        console.log(gl.getShaderInfoLog(shader));
      }
      gl.deleteShader(shader);
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  } else {
    return program;
  }
}


export function createTexture(gl: WebGL2RenderingContext, width: number, height: number) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1); // see https://webglfundamentals.org/webgl/lessons/webgl-data-textures.html
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,                // mip level
    gl.RGBA,          // internal format
    width,
    height,
    0,                // border
    gl.RGBA,          // format
    gl.UNSIGNED_BYTE, // type
    new Uint8Array(width * height * 4)
  );
  return tex;
}

export function createRedTexture(gl: WebGL2RenderingContext, width: number, height: number) {

  const data = new Uint32Array(width * height);

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1); // see https://webglfundamentals.org/webgl/lessons/webgl-data-textures.html
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,                // mip level
    gl.R32UI,          // internal format
    width,
    height,
    0,                // border
    gl.RED_INTEGER,   // format
    gl.UNSIGNED_INT,  // type
    data
  );
  return tex;
}

export function overwriteRedTexture(gl: WebGL2RenderingContext, xoff:number, yoff: number, width: number, height: number, data: Uint32Array) {
  gl.texSubImage2D(
    gl.TEXTURE_2D,
    0,                // mip level
    xoff,             // xoffset
    yoff,             // yoffset
    width,            // width
    height,           // height
    gl.RED_INTEGER,   // format
    gl.UNSIGNED_INT,  // type
    data
  );
}
