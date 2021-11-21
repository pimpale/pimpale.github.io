// code from https://webgl2fundamentals.org/webgl/lessons/webgl-fundamentals.html



function createShader(gl: WebGL2RenderingContext, shader_type: number, source: string) {
  const shader = gl.createShader(shader_type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl: WebGL2RenderingContext, shaders: WebGLShader[]) {
  const program = gl.createProgram();
  for (const shader of shaders) {
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}
