import{S as m}from"./style.23d33e06.js";import{f as d,a as h,j as s,b as i,R as b,F as R}from"./vendor.8c8c5e31.js";import{A}from"./ArticleLayout.576cc918.js";import{c as f,A as y}from"./math.d1c16880.js";import{b as x,f as F,u as C,d as _,g as L,c,a as o,h as w}from"./webgl.eb3a0ae9.js";import{c as D}from"./noise.d9f37728.js";import{a as T}from"./assert.194f7a38.js";import{T as G}from"./camera.7d887d42.js";function U(p,a){T(p>0),T(a>0);let e=[];for(let t=0;t<p;t++){const r=t/p,l=(t+1)/p;for(let n=0;n<a;n++){const g=n/a,u=(n+1)/a;e.push(d(r,g)),e.push(d(l,g)),e.push(d(r,u)),e.push(d(l,g)),e.push(d(l,u)),e.push(d(r,u))}}return e}const v=`#version 300 es
in vec2 c_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = c_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (c_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,N=`#version 300 es
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

  // now we advect the scalar field:
  // we calculate the scalar value that will be at this location at the next timestep
  float val = textureGood(u_scalar_tex, v_texCoord-vel);

  value = vec4(val, 0.0, 0.0, 0.0);
}
`,M=`#version 300 es
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
`,S=`#version 300 es
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
`,z=`#version 300 es
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
`,I=`#version 300 es
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
  vec2 pGradient = vec2((p21 - p01)/(2.0*x_off), (p12 - p10)/(2.0*y_off));

  // rho is an experimentally determined multiplier intended not to let the simulation diverge
  const float rho = 70000.0;

  // adjust the velocity by the pressure gradient
  vec2 vel = texture(u_vel_tex, v_texCoord).xy - (pGradient/rho);

  value = vec4(vel, 0, 0);
}
`,P=`#version 300 es
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
`,X=`#version 300 es
precision highp float;
precision highp sampler2D;

// the velocity texture
uniform sampler2D u_vel_tex;

// old normalized mouse position
uniform vec2 u_old_mouse;
// new normalized mouse position
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
  // the direction to paint in
  vec2 paintDir = (u_new_mouse - u_old_mouse)*0.01;

  float dist = sdSegment(v_texCoord, u_old_mouse, u_new_mouse);

  if(dist < 0.03) {
    value = texture(u_vel_tex, v_texCoord) + vec4(paintDir, 0, 0);
  } else {
    value = texture(u_vel_tex, v_texCoord);
  }
}
`,V=`#version 300 es
#define PI 3.1415926538

in vec2 a_position;
out vec2 v_texCoord;

const float u_majorRadius = 0.5;
const float u_minorRadius = 0.25;

uniform float u_majorAlpha;
uniform float u_minorAlpha;
uniform float u_lerpAlpha;

uniform mat4 u_worldViewProjection;


void main() {
   float theta = (a_position.x * u_minorAlpha + 0.5) * 2.0 * PI;
   float phi = a_position.y * u_majorAlpha * 2.0 * PI;

   v_texCoord = a_position;

   vec3 oldpos = vec3(a_position - 0.5, 0.0);
   vec3 newpos = vec3(
       (u_majorRadius + u_minorRadius * cos(theta)) * cos(phi),
       (u_majorRadius + u_minorRadius * cos(theta)) * sin(phi),
       u_minorRadius * sin(theta)
    );

   vec3 lerpedPos = mix(oldpos, newpos, u_lerpAlpha);

   gl_Position = u_worldViewProjection * vec4(lerpedPos, 1.0);
}
`,j=`#version 300 es
precision highp float;
precision highp sampler2D;

// the rendered texture
uniform sampler2D u_render_tex;

in vec2 v_texCoord;

out vec4 v_outColor;

void main() {
  // color: 0xEBDBB2,
  // v_outColor = vec4(0.922,0.859,0.698, 1.0);
  v_outColor = texture(u_render_tex, v_texCoord);
}
`,B=20,O=20,E=U(B,O);class H extends h.Component{constructor(a){super(a);this.canvas=h.createRef(),this.range=h.createRef(),this.scalarSelect=h.createRef(),this.velocitySelect=h.createRef(),this.scalarTextures=[],this.scalarFramebuffers=[],this.velTextures=[],this.velFramebuffers=[],this.pressureTextures=[],this.pressureFramebuffers=[],this.scalarIndex=0,this.velIndex=0,this.pressureIndex=0,this.needsScalarReset=!0,this.needsVelocityReset=!0,this.mousePos=null,this.viewPressure=!1,this.torusnessRange=h.createRef(),this.majorRange=h.createRef(),this.minorRange=h.createRef(),this.lerpRange=h.createRef(),this.torusCanvas=h.createRef(),this.handleTorusChange=()=>{const e=this.torusnessRange.current.valueAsNumber;this.majorRange.current.valueAsNumber=e,this.minorRange.current.valueAsNumber=e,this.lerpRange.current.valueAsNumber=Math.min(e*1.5,1),this.handleCircularityChange()},this.handleCircularityChange=()=>{const e=this.majorRange.current.valueAsNumber,t=this.minorRange.current.valueAsNumber,r=this.lerpRange.current.valueAsNumber;this.torusGl.uniform1f(this.torusMajorAlpha,e),this.torusGl.uniform1f(this.torusMinorAlpha,t),this.torusGl.uniform1f(this.torusLerpAlpha,r)},this.handleMouseDown=e=>{const t=this.getMousePos(this.canvas.current,e);this.mousePos={current:t,previous:t}},this.handleMouseUp=e=>{this.mousePos=null},this.handleMouseMove=e=>{!this.mousePos||(this.mousePos={current:this.getMousePos(this.canvas.current,e),previous:this.mousePos.current})},this.discardTouchEvent=e=>e.preventDefault(),this.animationLoop=()=>{var e,t;if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.camera.update(),this.mousePos&&(this.gl.useProgram(this.prog_paint_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.uniform2f(this.oldMouseLoc,f(this.mousePos.previous.x,0,this.props.size)/this.props.size,f(this.props.size-this.mousePos.previous.y,0,this.props.size)/this.props.size),this.gl.uniform2f(this.newMouseLoc,f(this.mousePos.current.x,0,this.props.size)/this.props.size,f(this.props.size-this.mousePos.current.y,0,this.props.size)/this.props.size),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2),this.needsScalarReset){this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]);const r=parseInt((e=this.scalarSelect.current)==null?void 0:e.value),l=new Float32Array(this.props.size*this.props.size);for(let n=0;n<this.props.size;n++){const g=Math.floor(n/(this.props.size/r))%2;for(let u=0;u<this.props.size;u++)Math.floor(u/(this.props.size/r))%2+g==1?l[n*this.props.size+u]=1:l[n*this.props.size+u]=0}x(this.gl,0,0,this.props.size,this.props.size,l),this.needsScalarReset=!1}if(this.needsVelocityReset){this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),x(this.gl,0,0,this.props.size,this.props.size,new Float32Array(this.props.size*this.props.size)),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]);let r;switch((t=this.velocitySelect.current)==null?void 0:t.value){case"curlnoise":r=D(3,this.props.size,this.props.size,Math.random()*500);break;default:r=new Float32Array(this.props.size*this.props.size*2);break}F(this.gl,0,0,this.props.size,this.props.size,r),this.needsVelocityReset=!1}for(let r=0;r<this.range.current.valueAsNumber;r++){this.gl.useProgram(this.prog_advect_scalar),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.scalarFramebuffers[(this.scalarIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.scalarIndex=(this.scalarIndex+1)%2,this.gl.useProgram(this.prog_advect_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2,this.gl.useProgram(this.prog_divergence),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.divFramebuffer),this.gl.drawArrays(this.gl.TRIANGLES,0,6);{this.gl.useProgram(this.prog_solve_pressure);for(let l=0;l<15;l++)this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.divTexture),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.pressureFramebuffers[(this.pressureIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.pressureIndex=(this.pressureIndex+1)%2}this.gl.useProgram(this.prog_apply_pressure_force),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2}this.gl.useProgram(this.prog_render),this.viewPressure?(this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.uniform1f(this.renderOffset,.5)):(this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]),this.gl.uniform1f(this.renderOffset,0)),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6);{const r=this.camera.getTrackballCameraMatrix(this.props.size,this.props.size);this.torusGl.uniformMatrix4fv(this.torusWorldViewProjectionLoc,!1,r),C(this.torusGl,this.torusTexture,this.canvas.current),this.torusGl.activeTexture(this.torusGl.TEXTURE0),this.torusGl.bindTexture(this.torusGl.TEXTURE_2D,this.torusTexture),this.torusGl.enable(this.torusGl.BLEND),this.torusGl.blendFunc(this.torusGl.SRC_ALPHA,this.torusGl.ONE_MINUS_SRC_ALPHA),this.torusGl.drawArrays(this.torusGl.TRIANGLES,0,E.length)}}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float");const a=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,a),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);for(let e=0;e<2;e++){const t=_(this.gl,this.props.size,this.props.size,new Float32Array(this.props.size*this.props.size));this.scalarTextures.push(t);const r=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,t,0),this.scalarFramebuffers.push(r)}for(let e=0;e<2;e++){const t=L(this.gl,this.props.size,this.props.size,new Float32Array(this.props.size*this.props.size*2));this.velTextures.push(t);const r=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,t,0),this.velFramebuffers.push(r)}this.divTexture=_(this.gl,this.props.size,this.props.size,new Float32Array(this.props.size*this.props.size)),this.divFramebuffer=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.divFramebuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.divTexture,0);for(let e=0;e<2;e++){const t=_(this.gl,this.props.size,this.props.size,new Float32Array(this.props.size*this.props.size));this.pressureTextures.push(t);const r=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,t,0),this.pressureFramebuffers.push(r)}{this.prog_advect_scalar=c(this.gl,[o(this.gl,this.gl.VERTEX_SHADER,v),o(this.gl,this.gl.FRAGMENT_SHADER,N)]);const e=this.gl.getAttribLocation(this.prog_advect_scalar,"c_position"),t=this.gl.getUniformLocation(this.prog_advect_scalar,"u_scalar_tex"),r=this.gl.getUniformLocation(this.prog_advect_scalar,"u_vel_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_advect_scalar),this.gl.uniform1i(t,0),this.gl.uniform1i(r,1)}{this.prog_advect_vel=c(this.gl,[o(this.gl,this.gl.VERTEX_SHADER,v),o(this.gl,this.gl.FRAGMENT_SHADER,M)]);const e=this.gl.getAttribLocation(this.prog_advect_vel,"c_position"),t=this.gl.getUniformLocation(this.prog_advect_vel,"u_vel_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_advect_vel),this.gl.uniform1i(t,1)}{this.prog_divergence=c(this.gl,[o(this.gl,this.gl.VERTEX_SHADER,v),o(this.gl,this.gl.FRAGMENT_SHADER,S)]);const e=this.gl.getAttribLocation(this.prog_divergence,"c_position"),t=this.gl.getUniformLocation(this.prog_divergence,"u_vel_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_divergence),this.gl.uniform1i(t,1)}{this.prog_solve_pressure=c(this.gl,[o(this.gl,this.gl.VERTEX_SHADER,v),o(this.gl,this.gl.FRAGMENT_SHADER,z)]);const e=this.gl.getAttribLocation(this.prog_solve_pressure,"c_position"),t=this.gl.getUniformLocation(this.prog_solve_pressure,"u_divergence_tex"),r=this.gl.getUniformLocation(this.prog_solve_pressure,"u_pressure_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_solve_pressure),this.gl.uniform1i(t,2),this.gl.uniform1i(r,3)}{this.prog_apply_pressure_force=c(this.gl,[o(this.gl,this.gl.VERTEX_SHADER,v),o(this.gl,this.gl.FRAGMENT_SHADER,I)]);const e=this.gl.getAttribLocation(this.prog_apply_pressure_force,"c_position"),t=this.gl.getUniformLocation(this.prog_apply_pressure_force,"u_vel_tex"),r=this.gl.getUniformLocation(this.prog_apply_pressure_force,"u_pressure_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_pressure_force),this.gl.uniform1i(t,1),this.gl.uniform1i(r,3)}{this.prog_render=c(this.gl,[o(this.gl,this.gl.VERTEX_SHADER,v),o(this.gl,this.gl.FRAGMENT_SHADER,P)]);const e=this.gl.getAttribLocation(this.prog_render,"c_position"),t=this.gl.getUniformLocation(this.prog_render,"u_scalar_tex"),r=this.gl.getUniformLocation(this.prog_render,"u_vel_tex");this.renderOffset=this.gl.getUniformLocation(this.prog_render,"u_offset"),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(t,0),this.gl.uniform1i(r,1)}{this.prog_paint_vel=c(this.gl,[o(this.gl,this.gl.VERTEX_SHADER,v),o(this.gl,this.gl.FRAGMENT_SHADER,X)]);const e=this.gl.getAttribLocation(this.prog_paint_vel,"c_position"),t=this.gl.getUniformLocation(this.prog_paint_vel,"u_vel_tex");this.newMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,"u_new_mouse"),this.oldMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,"u_old_mouse"),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_paint_vel),this.gl.uniform1i(t,1)}this.canvas.current.addEventListener("pointerdown",this.handleMouseDown),this.canvas.current.addEventListener("pointermove",this.handleMouseMove),window.addEventListener("pointerup",this.handleMouseUp),this.canvas.current.addEventListener("touchstart",this.discardTouchEvent),this.canvas.current.addEventListener("touchmove",this.discardTouchEvent),this.canvas.current.addEventListener("touchend",this.discardTouchEvent),this.canvas.current.addEventListener("touchcancel",this.discardTouchEvent);{this.camera=new G(this.torusCanvas.current,{}),this.torusGl=this.torusCanvas.current.getContext("webgl2",{premultipliedAlpha:!1}),this.torusGl.enable(this.torusGl.DEPTH_TEST),this.torusTexture=w(this.torusGl,this.props.size,this.props.size);const e=c(this.torusGl,[o(this.torusGl,this.torusGl.VERTEX_SHADER,V),o(this.torusGl,this.torusGl.FRAGMENT_SHADER,j)]),t=this.torusGl.getAttribLocation(e,"a_position"),r=this.torusGl.getUniformLocation(e,"u_render_tex");this.torusMajorAlpha=this.torusGl.getUniformLocation(e,"u_majorAlpha"),this.torusMinorAlpha=this.torusGl.getUniformLocation(e,"u_minorAlpha"),this.torusLerpAlpha=this.torusGl.getUniformLocation(e,"u_lerpAlpha"),this.torusWorldViewProjectionLoc=this.torusGl.getUniformLocation(e,"u_worldViewProjection");const l=this.torusGl.createBuffer();this.torusGl.bindBuffer(this.torusGl.ARRAY_BUFFER,l),this.torusGl.bufferData(this.torusGl.ARRAY_BUFFER,new Float32Array(E.flatMap(n=>[n[0],n[1]])),this.torusGl.STATIC_DRAW),this.torusGl.enableVertexAttribArray(t),this.torusGl.vertexAttribPointer(t,2,this.torusGl.FLOAT,!1,0,0),this.torusGl.useProgram(e),this.torusGl.uniform1f(this.torusMajorAlpha,0),this.torusGl.uniform1f(this.torusMinorAlpha,0),this.torusGl.uniform1f(this.torusLerpAlpha,0),this.torusGl.uniform1i(r,0)}this.torusnessRange.current.addEventListener("input",this.handleTorusChange),this.majorRange.current.addEventListener("input",this.handleCircularityChange),this.minorRange.current.addEventListener("input",this.handleCircularityChange),this.lerpRange.current.addEventListener("input",this.handleCircularityChange),this.animationLoop()}getMousePos(a,e){const t=a.getBoundingClientRect(),r=a.width/t.width,l=a.height/t.height;return{x:(e.clientX-t.left)*r,y:(e.clientY-t.top)*l}}componentWillUnmount(){this.canvas.current.removeEventListener("pointerdown",this.handleMouseDown),this.canvas.current.removeEventListener("pointermove",this.handleMouseMove),window.removeEventListener("pointerup",this.handleMouseUp),this.canvas.current.removeEventListener("touchstart",this.discardTouchEvent),this.canvas.current.removeEventListener("touchmove",this.discardTouchEvent),this.canvas.current.removeEventListener("touchend",this.discardTouchEvent),this.canvas.current.removeEventListener("touchcancel",this.discardTouchEvent),this.torusnessRange.current.removeEventListener("input",this.handleTorusChange),this.majorRange.current.removeEventListener("input",this.handleCircularityChange),this.minorRange.current.removeEventListener("input",this.handleCircularityChange),this.lerpRange.current.removeEventListener("input",this.handleCircularityChange),window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext(),this.torusGl.getExtension("WEBGL_lose_context").loseContext(),this.camera.cleanup()}render(){return s("div",{style:this.props.style,className:this.props.className,children:i("div",{className:"row",children:[s("div",{className:"col-md-8 d-flex",children:i("div",{children:[s("canvas",{className:"border border-dark mx-auto my-3",ref:this.canvas,height:this.props.size,width:this.props.size}),s("canvas",{className:"border border-dark mx-auto my-3",ref:this.torusCanvas,height:this.props.size,width:this.props.size})]})}),i("div",{className:"col-md-4",children:[i("div",{className:"border border-dark p-3 m-3",children:[i("div",{className:"form-group mb-3",children:[s("label",{className:"form-label",children:"Simulation Speed"}),s("input",{type:"range",className:"form-range",min:"0",max:"5",step:1,defaultValue:1,ref:this.range})]}),i("div",{className:"form-group mb-3",children:[s("label",{className:"form-label",children:"Scalar Field"}),i("select",{className:"form-select mb-3",defaultValue:8,ref:this.scalarSelect,children:[s("option",{value:1,children:"Empty"}),s("option",{value:2,children:"Grid 2"}),s("option",{value:8,children:"Grid 8"}),s("option",{value:64,children:"Grid 64"})]}),s("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsScalarReset=!0,children:"Reset Scalar"})]}),i("div",{className:"form-group mb-3",children:[s("label",{className:"form-label",children:"Velocity Field"}),i("select",{className:"form-select mb-3",defaultValue:8,ref:this.velocitySelect,children:[s("option",{value:"empty",children:"Empty"}),s("option",{value:"curlnoise",children:"Curl Noise"})]}),s("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsVelocityReset=!0,children:"Reset Velocity"})]}),s("div",{className:"form-group mb-3",children:i("div",{className:"form-check",children:[s("input",{type:"checkbox",className:"form-check-input",onClick:()=>this.viewPressure=!this.viewPressure}),s("label",{className:"form-check-label",children:"View Pressure"})]})})]}),i("div",{className:"border border-dark p-3 m-3",children:[i("div",{className:"form-group mb-3",children:[s("label",{className:"form-label",children:"Torusness"}),s("input",{type:"range",className:"form-range",min:"0",max:"1",step:"0.05",defaultValue:"0",ref:this.torusnessRange})]}),s("div",{className:"form-group mb-3",children:i("details",{children:[s("summary",{children:"Advanced Torus Controls"}),i("div",{className:"mx-auto d-block flex-grow-1 ",children:[s("label",{className:"form-label",children:"Join Major"}),s("input",{type:"range",className:"form-range",min:"0",max:"1",step:"0.05",defaultValue:"0",ref:this.majorRange})]}),i("div",{className:"mx-auto d-block flex-grow-1 ",children:[s("label",{className:"form-label",children:"Join Minor"}),s("input",{type:"range",className:"form-range",min:"0",max:"1",step:"0.05",defaultValue:"0",ref:this.minorRange})]}),i("div",{className:"mx-auto d-block flex-grow-1 ",children:[s("label",{className:"form-label",children:"Alpha"}),s("input",{type:"range",className:"form-range",min:"0",max:"1",step:"0.05",defaultValue:"0",ref:this.lerpRange})]})]})})]})]})]})})}}const k=()=>s(A,{children:({Citation:p,CitationBank:a})=>i(R,{children:[i(m,{id:"overview",name:"Overview",children:[s("p",{children:"Our goals are to:"}),i("ul",{children:[s("li",{children:"Map the fluid simulation onto a torus."}),s("li",{children:"Make the fluid simulation 3D."})]})]}),i(m,{id:"fluid2-unmapped-torus",name:"Incompressible Fluid on a Torus",children:[s("p",{children:"Incompressible"}),s(y,{title:"Canvas Setup",id:"canvas-setup-demo",children:s(H,{className:"mx-auto",style:{maxWidth:"40em"},size:400})})]}),s(m,{id:"sources",name:"Sources",children:s(a,{})})]})});b.render(s(h.StrictMode,{children:s(k,{})}),document.getElementById("root"));