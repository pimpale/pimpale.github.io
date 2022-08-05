import"./modulepreload-polyfill.b7f2da20.js";import{a,j as t,b as i,R,F as E}from"./bootstrap.7b2ffd8b.js";import{A}from"./ArticleLayout.c509d68a.js";import{S as f}from"./Section.a4164cd3.js";import{A as y}from"./AsideCard.6a80ab11.js";import{o as m,a as F,u as C,c as x,b as L,d as c,e as o,f as w}from"./webgl.f33c1914.js";import{c as g}from"./math.e4175633.js";import{c as D}from"./noise.ab64560a.js";import{g as S}from"./uvplane.24bf49d0.js";import{T as G}from"./camera.1550a2e1.js";import{C as N}from"./canvas.b4c9bbaa.js";import"./mod.a5ac064f.js";const p=`#version 300 es
in vec2 c_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = c_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (c_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,U=`#version 300 es
precision highp float;
precision highp sampler2D;

// the scalar texture
uniform sampler2D u_scalar_tex;

// the velocity texture
uniform sampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

float textureGood(sampler2D sam, vec2 uv) {
    vec2 res = vec2(textureSize(sam, 0));
    vec2 st = uv*res - 0.5;

    vec2 iuv = floor( st );
    vec2 fuv = fract( st );

    float a = texture( sam, (iuv+vec2(0.5,0.5))/res).r;
    float b = texture( sam, (iuv+vec2(1.5,0.5))/res).r;
    float c = texture( sam, (iuv+vec2(0.5,1.5))/res).r;
    float d = texture( sam, (iuv+vec2(1.5,1.5))/res).r;

    return mix( mix( a, b, fuv.x),
                mix( c, d, fuv.x), fuv.y );
}

void main() {
  // get the floatwise velocity
  vec2 vel = texture(u_vel_tex, v_texCoord).xy;

  // conver 


  // now we advect the scalar field:
  // we calculate the scalar value that will be at this location at the next timestep
  float val = textureGood(u_scalar_tex, v_texCoord-vel);

  value = vec4(val, 0.0, 0.0, 0.0);
}
`,z=`#version 300 es
precision highp float;
precision highp sampler2D;

// the velocity texture
uniform sampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

vec2 textureGood(sampler2D sam, vec2 uv)
{
    vec2 res = vec2(textureSize(sam, 0));
    vec2 st = uv*res - 0.5;

    vec2 iuv = floor( st );
    vec2 fuv = fract( st );

    vec2 a = texture(sam, (iuv+vec2(0.5,0.5))/res).xy;
    vec2 b = texture(sam, (iuv+vec2(1.5,0.5))/res).xy;
    vec2 c = texture(sam, (iuv+vec2(0.5,1.5))/res).xy;
    vec2 d = texture(sam, (iuv+vec2(1.5,1.5))/res).xy;

    return mix( mix( a, b, fuv.x),
                mix( c, d, fuv.x), fuv.y );
}

void main() {
  // get the floatwise velocity
  vec2 vel = texture(u_vel_tex, v_texCoord).xy;

  // now we advect the scalar field:
  // we calculate the scalar value that will be at this location at the next timestep
  vec2 val = textureGood(u_vel_tex, v_texCoord-vel);

  value = vec4(val, 0, 0);
}
`,I=`#version 300 es
precision highp float;
precision highp sampler2D;

// the velocity texture
uniform sampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

void main() {
  // get neighboring cell distances
  vec2 resolution = vec2(textureSize(u_vel_tex, 0));
  float x_off = 1.0/resolution.x;
  float y_off = 1.0/resolution.y;

  // get data
  vec2 v01 = texture(u_vel_tex, v_texCoord + vec2(-x_off,+0.000)).xy;
  vec2 v10 = texture(u_vel_tex, v_texCoord + vec2(+0.000,-y_off)).xy;
  vec2 v12 = texture(u_vel_tex, v_texCoord + vec2(+0.000,+y_off)).xy;
  vec2 v21 = texture(u_vel_tex, v_texCoord + vec2(+x_off,+0.000)).xy;

  // calculate divergence using finite differences
  // remember, divergence is df/dx + df/dy
  float divergence = (v01.x - v21.x)/(2.0*x_off)
                   + (v10.y - v12.y)/(2.0*y_off);

  // return divergence
  value = vec4(divergence, 0.0, 0.0, 0.0);
}
`,P=`#version 300 es
precision highp float;
precision highp sampler2D;

// the divergence texture
uniform sampler2D u_divergence_tex;

// the pressure texture of the last iteration
uniform sampler2D u_pressure_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

void main() {
  // get neighboring cell distances
  vec2 resolution = vec2(textureSize(u_divergence_tex, 0));
  float x_off = 1.0/resolution.x;
  float y_off = 1.0/resolution.y;

  // get previous iteration pressure data
  float p01 = texture(u_pressure_tex, v_texCoord + vec2(-x_off,+0.000)).x;
  float p10 = texture(u_pressure_tex, v_texCoord + vec2(+0.000,-y_off)).x;
  float p12 = texture(u_pressure_tex, v_texCoord + vec2(+0.000,+y_off)).x;
  float p21 = texture(u_pressure_tex, v_texCoord + vec2(+x_off,+0.000)).x;

  // get divergence
  float d11 = texture(u_divergence_tex , v_texCoord).x;

  // use the jacobi method to derive the next iteration of pressure at this location
  float p_next = (d11 + p01 + p10 + p12 + p21)/4.0;

  value = vec4(p_next, 0.0, 0.0, 0.0);
}
`,M=`#version 300 es
precision highp float;
precision highp sampler2D;

// the velocity texture
uniform sampler2D u_vel_tex;

// the pressure texture
uniform sampler2D u_pressure_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

void main() {
  // get neighboring cell distances
  vec2 resolution = vec2(textureSize(u_vel_tex, 0));
  float x_off = 1.0/resolution.x;
  float y_off = 1.0/resolution.y;

  // get pressure data
  float p01 = texture(u_pressure_tex, v_texCoord + vec2(-x_off,+0.000)).x;
  float p10 = texture(u_pressure_tex, v_texCoord + vec2(+0.000,-y_off)).x;
  float p12 = texture(u_pressure_tex, v_texCoord + vec2(+0.000,+y_off)).x;
  float p21 = texture(u_pressure_tex, v_texCoord + vec2(+x_off,+0.000)).x;

  // calculate the gradient
  // remember, the gradient is [df/dx, df/dy]
  vec2 pGradient = vec2((p21 - p01)/resolution.x, (p12 - p10)/resolution.y);

  // adjust the velocity by the pressure gradient
  vec2 vel = texture(u_vel_tex, v_texCoord).xy - pGradient;

  value = vec4(vel, 0, 0);
}
`,X=`#version 300 es
precision highp float;
precision highp sampler2D;

// the scalar texture
uniform sampler2D u_scalar_tex;

// offset to apply
uniform float u_offset;

// the velocity texture
uniform sampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 outColor;

const float ARROW_TILE_SIZE = 32.0;

// Computes the center pixel of the tile containing pixel pos
vec2 arrowTileCenterCoord(vec2 pos) {
	return (floor(pos / ARROW_TILE_SIZE) + 0.5) * ARROW_TILE_SIZE;
}

// Computes the signed distance from a line segment
float line(vec2 p, vec2 p1, vec2 p2) {
  vec2 center = (p1 + p2) * 0.5;
  float len = length(p2 - p1);
  vec2 dir = (p2 - p1) / len;
  vec2 rel_p = p - center;
  float dist1 = abs(dot(rel_p, vec2(dir.y, -dir.x)));
  float dist2 = abs(dot(rel_p, dir)) - 0.5*len;
  return max(dist1, dist2);
}

// v = field sampled at arrowTileCenterCoord(p), scaled by the length
// desired in pixels for arrows
// Returns a signed distance from the arrow
float arrow(vec2 p, vec2 v) {
  // Make everything relative to the center, which may be fractional
  p -= arrowTileCenterCoord(p);
    
  float mag_v = length(v), mag_p = length(p);
  
  if (mag_v > 0.0) {
    // Non-zero velocity case
    vec2 dir_v = v / mag_v;
    
    // We can't draw arrows larger than the tile radius, so clamp magnitude.
    // Enforce a minimum length to help see direction
    mag_v = clamp(mag_v, 5.0, ARROW_TILE_SIZE * 0.5);

    // Arrow tip location
    v = dir_v * mag_v;

    // Signed distance from shaft
    float shaft = line(p, v, -v);
    // Signed distance from head
    float head = min(line(p, v, 0.4*v + 0.2*vec2(-v.y, v.x)),
                     line(p, v, 0.4*v + 0.2*vec2(v.y, -v.x)));

    return min(shaft, head);
  } else {
    // Signed distance from the center point
    return mag_p;
  }
}

vec3 inferno(float t) {
    const vec3 c0 = vec3(0.0002189403691192265, 0.001651004631001012, -0.01948089843709184);
    const vec3 c1 = vec3(0.1065134194856116, 0.5639564367884091, 3.932712388889277);
    const vec3 c2 = vec3(11.60249308247187, -3.972853965665698, -15.9423941062914);
    const vec3 c3 = vec3(-41.70399613139459, 17.43639888205313, 44.35414519872813);
    const vec3 c4 = vec3(77.162935699427, -33.40235894210092, -81.80730925738993);
    const vec3 c5 = vec3(-71.31942824499214, 32.62606426397723, 73.20951985803202);
    const vec3 c6 = vec3(25.13112622477341, -12.24266895238567, -23.07032500287172);

    return c0+t*(c1+t*(c2+t*(c3+t*(c4+t*(c5+t*c6)))));
}

void main() {
  // both textures are the same size
  vec2 resolution = vec2(textureSize(u_scalar_tex, 0));

  // coordinate in pixels
  vec2 pxCoord = v_texCoord*resolution;

  vec2 tileCenterCoord = arrowTileCenterCoord(pxCoord);

  vec2 vel_vec = texture(u_vel_tex, tileCenterCoord/resolution).xy;

  float arrow_dist = arrow(pxCoord, vel_vec * ARROW_TILE_SIZE);
  vec4 arrow_col = vec4(0, 1.0, 0, clamp(arrow_dist, 0.0, 1.0));

  float scalar_val = clamp(texture(u_scalar_tex, v_texCoord).x + u_offset, 0.0, 1.0);
  vec4 field_col = vec4(inferno(scalar_val), 1.0);

  outColor = mix(arrow_col, field_col, arrow_col.a);
}
`,V=`#version 300 es
precision highp float;
precision highp sampler2D;

// the velocity texture
uniform sampler2D u_vel_tex;

// old mouse position
uniform vec2 u_old_mouse;
// new mouse position
uniform vec2 u_new_mouse;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

float sdSegment( in vec2 p, in vec2 a, in vec2 b )
{
    vec2 pa = p-a, ba = b-a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length( pa - ba*h );
}

void main() {
  // both textures are the same size
  vec2 resolution = vec2(textureSize(u_vel_tex, 0));

  // the direction to paint in
  vec2 paintDir = 0.01*(u_new_mouse - u_old_mouse)/resolution.y;

  // coordinate in pixels
  vec2 pxCoord = v_texCoord*resolution;
  float pxDist = sdSegment(pxCoord, u_old_mouse, u_new_mouse);

  if(pxDist < 20.0) {
    value = texture(u_vel_tex, v_texCoord) + vec4(paintDir, 0, 0);
  } else {
    value = texture(u_vel_tex, v_texCoord);
  }
}
`,B=`#version 300 es
#define PI 3.1415926538

in vec2 a_position;
out vec2 v_texCoord;

const float u_radius = 0.5;

uniform float u_phiAlpha;
uniform float u_thetaAlpha;
uniform float u_lerpAlpha;

uniform mat4 u_worldViewProjection;


void main() {
   float phi = a_position.x * u_phiAlpha * PI;
   float theta = a_position.y * u_thetaAlpha * 2.0 * PI;

   v_texCoord = a_position;

   vec3 oldpos = vec3(a_position - 0.5, 0.0);
   vec3 newpos = vec3(
       u_radius * cos(theta) * sin(phi),
       u_radius * sin(theta) * sin(phi),
       u_radius * cos(phi)
    );

   vec3 lerpedPos = mix(oldpos, newpos, u_lerpAlpha);

   gl_Position = u_worldViewProjection * vec4(lerpedPos, 1.0);
}
`,O=`#version 300 es
precision highp float;
precision highp sampler2D;

// the rendered texture
uniform sampler2D u_render_tex;

in vec2 v_texCoord;

out vec4 v_outColor;

void main() {
  // color: 0xEBDBB2,
  // v_outColor = vec4(0.922,0.859,0.698, 1.0);
  v_outColor = texture(u_render_tex, v_texCoord.yx);
}
`,H=20,k=20,_=S(H,k);class j extends a.Component{constructor(h){super(h),this.canvas=a.createRef(),this.range=a.createRef(),this.scalarSelect=a.createRef(),this.velocitySelect=a.createRef(),this.scalarTextures=[],this.scalarFramebuffers=[],this.velTextures=[],this.velFramebuffers=[],this.pressureTextures=[],this.pressureFramebuffers=[],this.scalarIndex=0,this.velIndex=0,this.pressureIndex=0,this.needsScalarReset=!0,this.needsVelocityReset=!0,this.viewPressure=!1,this.spherenessRange=a.createRef(),this.thetaRange=a.createRef(),this.phiRange=a.createRef(),this.lerpRange=a.createRef(),this.sphereCanvas=a.createRef(),this.handleSphereChange=()=>{const e=this.spherenessRange.current.valueAsNumber;this.thetaRange.current.valueAsNumber=e,this.phiRange.current.valueAsNumber=e,this.lerpRange.current.valueAsNumber=Math.min(e*1.5,1),this.handleCircularityChange()},this.handleCircularityChange=()=>{const e=this.thetaRange.current.valueAsNumber,s=this.phiRange.current.valueAsNumber,r=this.lerpRange.current.valueAsNumber;this.sphereGl.uniform1f(this.sphereThetaAlpha,e),this.sphereGl.uniform1f(this.spherePhiAlpha,s),this.sphereGl.uniform1f(this.sphereLerpAlpha,r)},this.animationLoop=()=>{var s,r;this.requestID=window.requestAnimationFrame(this.animationLoop),this.camera.update();const e=this.cmt.mousePos;if(e&&(this.gl.useProgram(this.prog_paint_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.uniform2f(this.oldMouseLoc,g(e.previous.x,0,this.props.xsize),g(this.props.ysize-e.previous.y,0,this.props.ysize)),this.gl.uniform2f(this.newMouseLoc,g(e.current.x,0,this.props.xsize),g(this.props.ysize-e.current.y,0,this.props.ysize)),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2),this.needsScalarReset){const l=this.props.ysize;this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]);const n=parseInt((s=this.scalarSelect.current)==null?void 0:s.value),d=new Float32Array(this.props.xsize*this.props.ysize);for(let u=0;u<this.props.ysize;u++){const b=Math.floor(u/(l/n))%2;for(let v=0;v<this.props.xsize;v++)Math.floor(v/(l/n))%2+b==1?d[u*this.props.xsize+v]=1:d[u*this.props.xsize+v]=0}m(this.gl,0,0,this.props.xsize,this.props.ysize,d),this.needsScalarReset=!1}if(this.needsVelocityReset){this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),m(this.gl,0,0,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize)),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]);let l;switch((r=this.velocitySelect.current)==null?void 0:r.value){case"curlnoise":l=D(3,this.props.xsize,this.props.ysize,Math.random()*500);break;default:l=new Float32Array(this.props.xsize*this.props.ysize*2);break}F(this.gl,0,0,this.props.xsize,this.props.ysize,l),this.needsVelocityReset=!1}for(let l=0;l<this.range.current.valueAsNumber;l++){this.gl.useProgram(this.prog_advect_scalar),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.scalarFramebuffers[(this.scalarIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.scalarIndex=(this.scalarIndex+1)%2,this.gl.useProgram(this.prog_advect_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2,this.gl.useProgram(this.prog_divergence),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.divFramebuffer),this.gl.drawArrays(this.gl.TRIANGLES,0,6);{this.gl.useProgram(this.prog_solve_pressure);for(let n=0;n<15;n++)this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.divTexture),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.pressureFramebuffers[(this.pressureIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.pressureIndex=(this.pressureIndex+1)%2}this.gl.useProgram(this.prog_apply_pressure_force),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2}this.gl.useProgram(this.prog_render),this.viewPressure?(this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.uniform1f(this.renderOffset,.5)):(this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]),this.gl.uniform1f(this.renderOffset,0)),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6);{const l=this.camera.getTrackballCameraMatrix(this.props.spheresize,this.props.spheresize);this.sphereGl.uniformMatrix4fv(this.sphereWorldViewProjectionLoc,!1,l),C(this.sphereGl,this.sphereTexture,this.canvas.current),this.sphereGl.activeTexture(this.sphereGl.TEXTURE0),this.sphereGl.bindTexture(this.sphereGl.TEXTURE_2D,this.sphereTexture),this.sphereGl.enable(this.sphereGl.BLEND),this.sphereGl.blendFunc(this.sphereGl.SRC_ALPHA,this.sphereGl.ONE_MINUS_SRC_ALPHA),this.sphereGl.drawArrays(this.sphereGl.TRIANGLES,0,_.length)}}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float");const h=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,h),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);for(let e=0;e<2;e++){const s=x(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize));this.scalarTextures.push(s);const r=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,s,0),this.scalarFramebuffers.push(r)}for(let e=0;e<2;e++){const s=L(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize*2));this.velTextures.push(s);const r=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,s,0),this.velFramebuffers.push(r)}this.divTexture=x(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize)),this.divFramebuffer=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.divFramebuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.divTexture,0);for(let e=0;e<2;e++){const s=x(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize));this.pressureTextures.push(s);const r=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,s,0),this.pressureFramebuffers.push(r)}{this.prog_advect_scalar=c(this.gl,[o(this.gl,this.gl.VERTEX_SHADER,p),o(this.gl,this.gl.FRAGMENT_SHADER,U)]);const e=this.gl.getAttribLocation(this.prog_advect_scalar,"c_position"),s=this.gl.getUniformLocation(this.prog_advect_scalar,"u_scalar_tex"),r=this.gl.getUniformLocation(this.prog_advect_scalar,"u_vel_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_advect_scalar),this.gl.uniform1i(s,0),this.gl.uniform1i(r,1)}{this.prog_advect_vel=c(this.gl,[o(this.gl,this.gl.VERTEX_SHADER,p),o(this.gl,this.gl.FRAGMENT_SHADER,z)]);const e=this.gl.getAttribLocation(this.prog_advect_vel,"c_position"),s=this.gl.getUniformLocation(this.prog_advect_vel,"u_vel_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_advect_vel),this.gl.uniform1i(s,1)}{this.prog_divergence=c(this.gl,[o(this.gl,this.gl.VERTEX_SHADER,p),o(this.gl,this.gl.FRAGMENT_SHADER,I)]);const e=this.gl.getAttribLocation(this.prog_divergence,"c_position"),s=this.gl.getUniformLocation(this.prog_divergence,"u_vel_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_divergence),this.gl.uniform1i(s,1)}{this.prog_solve_pressure=c(this.gl,[o(this.gl,this.gl.VERTEX_SHADER,p),o(this.gl,this.gl.FRAGMENT_SHADER,P)]);const e=this.gl.getAttribLocation(this.prog_solve_pressure,"c_position"),s=this.gl.getUniformLocation(this.prog_solve_pressure,"u_divergence_tex"),r=this.gl.getUniformLocation(this.prog_solve_pressure,"u_pressure_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_solve_pressure),this.gl.uniform1i(s,2),this.gl.uniform1i(r,3)}{this.prog_apply_pressure_force=c(this.gl,[o(this.gl,this.gl.VERTEX_SHADER,p),o(this.gl,this.gl.FRAGMENT_SHADER,M)]);const e=this.gl.getAttribLocation(this.prog_apply_pressure_force,"c_position"),s=this.gl.getUniformLocation(this.prog_apply_pressure_force,"u_vel_tex"),r=this.gl.getUniformLocation(this.prog_apply_pressure_force,"u_pressure_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_pressure_force),this.gl.uniform1i(s,1),this.gl.uniform1i(r,3)}{this.prog_render=c(this.gl,[o(this.gl,this.gl.VERTEX_SHADER,p),o(this.gl,this.gl.FRAGMENT_SHADER,X)]);const e=this.gl.getAttribLocation(this.prog_render,"c_position"),s=this.gl.getUniformLocation(this.prog_render,"u_scalar_tex"),r=this.gl.getUniformLocation(this.prog_render,"u_vel_tex");this.renderOffset=this.gl.getUniformLocation(this.prog_render,"u_offset"),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(s,0),this.gl.uniform1i(r,1)}{this.prog_paint_vel=c(this.gl,[o(this.gl,this.gl.VERTEX_SHADER,p),o(this.gl,this.gl.FRAGMENT_SHADER,V)]);const e=this.gl.getAttribLocation(this.prog_paint_vel,"c_position"),s=this.gl.getUniformLocation(this.prog_paint_vel,"u_vel_tex");this.newMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,"u_new_mouse"),this.oldMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,"u_old_mouse"),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_paint_vel),this.gl.uniform1i(s,1)}{this.camera=new G(this.sphereCanvas.current,{}),this.sphereGl=this.sphereCanvas.current.getContext("webgl2",{premultipliedAlpha:!1}),this.sphereGl.enable(this.sphereGl.DEPTH_TEST),this.sphereTexture=w(this.sphereGl,this.props.spheresize,this.props.spheresize);const e=c(this.sphereGl,[o(this.sphereGl,this.sphereGl.VERTEX_SHADER,B),o(this.sphereGl,this.sphereGl.FRAGMENT_SHADER,O)]),s=this.sphereGl.getAttribLocation(e,"a_position"),r=this.sphereGl.getUniformLocation(e,"u_render_tex");this.sphereThetaAlpha=this.sphereGl.getUniformLocation(e,"u_thetaAlpha"),this.spherePhiAlpha=this.sphereGl.getUniformLocation(e,"u_phiAlpha"),this.sphereLerpAlpha=this.sphereGl.getUniformLocation(e,"u_lerpAlpha"),this.sphereWorldViewProjectionLoc=this.sphereGl.getUniformLocation(e,"u_worldViewProjection");const l=this.sphereGl.createBuffer();this.sphereGl.bindBuffer(this.sphereGl.ARRAY_BUFFER,l),this.sphereGl.bufferData(this.sphereGl.ARRAY_BUFFER,new Float32Array(_.flatMap(n=>[n[0],n[1]])),this.sphereGl.STATIC_DRAW),this.sphereGl.enableVertexAttribArray(s),this.sphereGl.vertexAttribPointer(s,2,this.sphereGl.FLOAT,!1,0,0),this.sphereGl.useProgram(e),this.sphereGl.uniform1f(this.sphereThetaAlpha,0),this.sphereGl.uniform1f(this.spherePhiAlpha,0),this.sphereGl.uniform1f(this.sphereLerpAlpha,0),this.sphereGl.uniform1i(r,0)}this.spherenessRange.current.addEventListener("input",this.handleSphereChange),this.thetaRange.current.addEventListener("input",this.handleCircularityChange),this.phiRange.current.addEventListener("input",this.handleCircularityChange),this.lerpRange.current.addEventListener("input",this.handleCircularityChange),this.cmt=new N(this.canvas.current),this.animationLoop()}getMousePos(h,e){const s=h.getBoundingClientRect(),r=h.width/s.width,l=h.height/s.height;return{x:(e.clientX-s.left)*r,y:(e.clientY-s.top)*l}}componentWillUnmount(){this.cmt.cleanup(),this.spherenessRange.current.removeEventListener("input",this.handleSphereChange),this.thetaRange.current.removeEventListener("input",this.handleCircularityChange),this.phiRange.current.removeEventListener("input",this.handleCircularityChange),this.lerpRange.current.removeEventListener("input",this.handleCircularityChange),window.cancelAnimationFrame(this.requestID),this.camera.cleanup()}render(){return t("div",{style:this.props.style,className:this.props.className,children:i("div",{className:"row",children:[t("div",{className:"col-md-8 d-flex",children:i("div",{children:[t("canvas",{className:"border border-dark mx-3 my-3",ref:this.canvas,width:this.props.xsize,height:this.props.ysize}),t("canvas",{className:"border border-dark mx-3 my-3",ref:this.sphereCanvas,width:this.props.spheresize,height:this.props.spheresize})]})}),i("div",{className:"col-md-4",children:[i("div",{className:"border border-dark p-3 m-3",children:[i("div",{className:"form-group mb-3",children:[t("label",{className:"form-label",children:"Simulation Speed"}),t("input",{type:"range",className:"form-range",min:"0",max:"5",step:1,defaultValue:1,ref:this.range})]}),i("div",{className:"form-group mb-3",children:[t("label",{className:"form-label",children:"Scalar Field"}),i("select",{className:"form-select mb-3",defaultValue:8,ref:this.scalarSelect,children:[t("option",{value:1,children:"Empty"}),t("option",{value:2,children:"Grid 2"}),t("option",{value:8,children:"Grid 8"}),t("option",{value:64,children:"Grid 64"})]}),t("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsScalarReset=!0,children:"Reset Scalar"})]}),i("div",{className:"form-group mb-3",children:[t("label",{className:"form-label",children:"Velocity Field"}),i("select",{className:"form-select mb-3",defaultValue:8,ref:this.velocitySelect,children:[t("option",{value:"empty",children:"Empty"}),t("option",{value:"curlnoise",children:"Curl Noise"})]}),t("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsVelocityReset=!0,children:"Reset Velocity"})]}),t("div",{className:"form-group mb-3",children:i("div",{className:"form-check",children:[t("input",{type:"checkbox",className:"form-check-input",onClick:()=>this.viewPressure=!this.viewPressure}),t("label",{className:"form-check-label",children:"View Pressure"})]})})]}),i("div",{className:"border border-dark p-3 m-3",children:[i("div",{className:"form-group mb-3",children:[t("label",{className:"form-label",children:"Sphereness"}),t("input",{type:"range",className:"form-range",min:"0",max:"1",step:"0.05",defaultValue:"0",ref:this.spherenessRange})]}),t("div",{className:"form-group mb-3",children:i("details",{children:[t("summary",{children:"Advanced Sphere Controls"}),i("div",{className:"mx-auto d-block flex-grow-1 ",children:[t("label",{className:"form-label",children:"Join Major"}),t("input",{type:"range",className:"form-range",min:"0",max:"1",step:"0.05",defaultValue:"0",ref:this.thetaRange})]}),i("div",{className:"mx-auto d-block flex-grow-1 ",children:[t("label",{className:"form-label",children:"Join Minor"}),t("input",{type:"range",className:"form-range",min:"0",max:"1",step:"0.05",defaultValue:"0",ref:this.phiRange})]}),i("div",{className:"mx-auto d-block flex-grow-1 ",children:[t("label",{className:"form-label",children:"Alpha"}),t("input",{type:"range",className:"form-range",min:"0",max:"1",step:"0.05",defaultValue:"0",ref:this.lerpRange})]})]})})]})]})]})})}}const W=()=>t(A,{children:({Citation:T,CitationBank:h})=>i(E,{children:[i(f,{id:"overview",name:"Overview",children:[t("p",{children:"Our goals are to:"}),i("ul",{children:[t("li",{children:"Map the fluid simulation onto a sphere."}),t("li",{children:"Make the fluid simulation 3D."})]})]}),i(f,{id:"Fluid3-unmapped-sphere",name:"Incompressible Fluid on a Sphere",children:[t("p",{children:"Incompressible"}),t(y,{title:"Canvas Setup",id:"canvas-setup-demo",children:t(j,{className:"mx-auto",style:{maxWidth:"40em"},xsize:400,ysize:400,spheresize:400})})]}),t(f,{id:"sources",name:"Sources",children:t(h,{})})]})});R.render(t(a.StrictMode,{children:t(W,{})}),document.getElementById("root"));
