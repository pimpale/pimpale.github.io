import"./modulepreload-polyfill-3cfb730f.js";import{a as c,j as e}from"./bootstrap-b24ee2f7.js";import{A as L}from"./ArticleLayout-b08dd728.js";import{S as _}from"./Section-b5d1d1be.js";import{H as d}from"./HrefLink-23e65c28.js";import{i as o}from"./react-katex.m-42c4554c.js";import{A as b}from"./AsideCard-a2285f3c.js";import{a as D,b as N}from"./Articles-35cecfd8.js";import{o as w,a as R,d as h,e as l,c as y,b as j}from"./webgl-cad418c0.js";import{c as p}from"./math-2c30d096.js";import{V as A}from"./visibility-2af1ebd7.js";import{c as F}from"./noise-c0066df3.js";import{C as S}from"./canvas-6f722327.js";import{A as C}from"./arrow-90deg-down-ffdf53d8.js";import{c as I}from"./client-91afa0cf.js";import"./defineProperty-e848b808.js";import"./mod-fc7b8db8.js";const T=`#version 300 es
in vec2 a_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = a_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (a_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,z=`#version 300 es
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

    float a = texture(sam, (iuv+vec2(0.5,0.5))/res).r;
    float b = texture(sam, (iuv+vec2(1.5,0.5))/res).r;
    float c = texture(sam, (iuv+vec2(0.5,1.5))/res).r;
    float d = texture(sam, (iuv+vec2(1.5,1.5))/res).r;

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
`,k=`#version 300 es
precision highp float;
precision highp sampler2D;

// the scalar texture
uniform sampler2D u_scalar_tex;

// the velocity texture
uniform sampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 outColor;

const float ARROW_TILE_SIZE = 16.0;

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

  float scalar_val = texture(u_scalar_tex, v_texCoord).x;
  vec4 field_col = vec4(inferno(scalar_val), 1.0);

  outColor = mix(arrow_col, field_col, arrow_col.a);
}
`,U=`#version 300 es
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
  vec2 paintDir = (u_new_mouse - u_old_mouse)*0.001;

  float dist = sdSegment(v_texCoord, u_old_mouse, u_new_mouse);

  if(dist < 0.03) {
    value = texture(u_vel_tex, v_texCoord) + vec4(paintDir, 0.0, 0.0);
  } else {
    value = texture(u_vel_tex, v_texCoord);
  }
}
`;class M extends c.Component{constructor(u){super(u),this.canvas=c.createRef(),this.range=c.createRef(),this.scalarSelect=c.createRef(),this.velocitySelect=c.createRef(),this.scalarTextures=[],this.scalarFramebuffers=[],this.velTextures=[],this.velFramebuffers=[],this.scalarIndex=0,this.velIndex=0,this.needsScalarReset=!0,this.needsVelocityReset=!0,this.animationLoop=()=>{var i,r;if(this.requestID=window.requestAnimationFrame(this.animationLoop),!this.vis.isVisible()&&this.props.runInBackground!==!0)return;const t=this.cmt.mousePos;if(t){const s=this.props.size;this.gl.useProgram(this.prog_paint_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.uniform2f(this.oldMouseLoc,p(t.previous.x,0,s)/s,p(s-t.previous.y,0,s)/s),this.gl.uniform2f(this.newMouseLoc,p(t.current.x,0,s)/s,p(s-t.current.y,0,s)/s),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2}if(this.needsScalarReset){this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]);const s=parseInt((i=this.scalarSelect.current)==null?void 0:i.value),a=new Float32Array(this.props.size*this.props.size);for(let n=0;n<this.props.size;n++){const x=Math.floor(n/(this.props.size/s))%2;for(let f=0;f<this.props.size;f++)Math.floor(f/(this.props.size/s))%2+x==1?a[n*this.props.size+f]=1:a[n*this.props.size+f]=0}w(this.gl,0,0,this.props.size,this.props.size,a),this.needsScalarReset=!1}if(this.needsVelocityReset){this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]);let s;switch((r=this.velocitySelect.current)==null?void 0:r.value){case"curlnoise":s=F(3,this.props.size,this.props.size,Math.random()*500);break;default:s=new Float32Array(this.props.size*this.props.size*2);break}R(this.gl,0,0,this.props.size,this.props.size,s),this.needsVelocityReset=!1}this.gl.useProgram(this.prog_advect_scalar);for(let s=0;s<this.range.current.valueAsNumber;s++){const a=this.scalarTextures[this.scalarIndex],n=this.scalarFramebuffers[(this.scalarIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,a),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,n),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.scalarIndex=(this.scalarIndex+1)%2}this.gl.useProgram(this.prog_render),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float");const u=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,u),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_advect_scalar=h(this.gl,[l(this.gl,this.gl.VERTEX_SHADER,T),l(this.gl,this.gl.FRAGMENT_SHADER,z)]);const t=this.gl.getAttribLocation(this.prog_advect_scalar,"a_position"),i=this.gl.getUniformLocation(this.prog_advect_scalar,"u_scalar_tex"),r=this.gl.getUniformLocation(this.prog_advect_scalar,"u_vel_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0);for(let s=0;s<2;s++){const a=y(this.gl,this.props.size,this.props.size,new Float32Array(this.props.size*this.props.size));this.scalarTextures.push(a);const n=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,n),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,a,0),this.scalarFramebuffers.push(n)}for(let s=0;s<2;s++){new Int32Array(this.props.size*this.props.size*2);const a=j(this.gl,this.props.size,this.props.size,new Float32Array(this.props.size*this.props.size*2));this.velTextures.push(a);const n=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,n),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,a,0),this.velFramebuffers.push(n)}this.gl.useProgram(this.prog_advect_scalar),this.gl.uniform1i(i,0),this.gl.uniform1i(r,1)}{this.prog_render=h(this.gl,[l(this.gl,this.gl.VERTEX_SHADER,T),l(this.gl,this.gl.FRAGMENT_SHADER,k)]);const t=this.gl.getAttribLocation(this.prog_render,"a_position"),i=this.gl.getUniformLocation(this.prog_render,"u_scalar_tex"),r=this.gl.getUniformLocation(this.prog_render,"u_vel_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(i,0),this.gl.uniform1i(r,1)}{this.prog_paint_vel=h(this.gl,[l(this.gl,this.gl.VERTEX_SHADER,T),l(this.gl,this.gl.FRAGMENT_SHADER,U)]);const t=this.gl.getAttribLocation(this.prog_paint_vel,"a_position"),i=this.gl.getUniformLocation(this.prog_paint_vel,"u_vel_tex");this.newMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,"u_new_mouse"),this.oldMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,"u_old_mouse"),this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_paint_vel),this.gl.uniform1i(i,1)}this.cmt=new S(this.canvas.current),this.vis=new A(this.canvas.current),this.animationLoop()}componentWillUnmount(){window.cancelAnimationFrame(this.requestID),this.cmt.cleanup(),this.vis.cleanup()}render(){return e.jsx("div",{style:this.props.style,className:this.props.className,children:e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"col-md-8 d-flex",children:[e.jsxs("div",{className:"text-center pb-3",hidden:!this.props.showInstructions,children:[e.jsx(C,{className:"fs-3",style:{transform:"translateY(0.5rem)"}}),e.jsx("span",{className:"fs-5",style:{fontFamily:"Permanent Marker"},children:" Drag to Stir!"})]}),e.jsx("canvas",{className:"border border-dark",ref:this.canvas,height:this.props.size,width:this.props.size})]}),e.jsx("div",{className:"col-md-4",children:e.jsxs("div",{className:"border border-dark p-3 m-3",children:[e.jsx("h6",{children:"Controls"}),e.jsxs("div",{className:"form-group mb-3",children:[e.jsx("label",{className:"form-label",children:"Simulation Speed"}),e.jsx("input",{type:"range",className:"form-range",min:"0",max:"5",step:1,defaultValue:1,ref:this.range})]}),e.jsxs("div",{className:"form-group mb-3",children:[e.jsx("label",{className:"form-label",children:"Scalar Field"}),e.jsxs("select",{className:"form-select mb-3",defaultValue:8,ref:this.scalarSelect,children:[e.jsx("option",{value:1,children:"Empty"}),e.jsx("option",{value:2,children:"Grid 2"}),e.jsx("option",{value:8,children:"Grid 8"}),e.jsx("option",{value:64,children:"Grid 64"})]}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsScalarReset=!0,children:"Reset Scalar"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Velocity Field"}),e.jsxs("select",{className:"form-select mb-3",defaultValue:8,ref:this.velocitySelect,children:[e.jsx("option",{value:"empty",children:"Empty"}),e.jsx("option",{value:"curlnoise",children:"Curl Noise"})]}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsVelocityReset=!0,children:"Reset Velocity"})]})]})})]})})}}const m=`#version 300 es
in vec2 c_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = c_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (c_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,X=`#version 300 es
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
`,V=`#version 300 es
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
`,P=`#version 300 es
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
`,G=`#version 300 es
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
`,O=`#version 300 es
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
`,q=`#version 300 es
precision highp float;
precision highp sampler2D;

// the scalar texture
uniform sampler2D u_scalar_tex;

// multipler to apply to the scalar texture before drawing
uniform float u_multiplier;

// offset to apply
uniform float u_offset;

// the velocity texture
uniform sampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 outColor;

const float ARROW_TILE_SIZE = 16.0;

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

  float scalar_val = clamp(texture(u_scalar_tex, v_texCoord).x*u_multiplier + u_offset, 0.0, 1.0);
  vec4 field_col = vec4(inferno(scalar_val), 1.0);

  outColor = mix(arrow_col, field_col, arrow_col.a);
}
`,B=`#version 300 es
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
  //vec2 paintDir = 0.01*(u_new_mouse - u_old_mouse)/resolution.y;
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
`;class E extends c.Component{constructor(u){super(u),this.canvas=c.createRef(),this.range=c.createRef(),this.scalarSelect=c.createRef(),this.velocitySelect=c.createRef(),this.scalarTextures=[],this.scalarFramebuffers=[],this.velTextures=[],this.velFramebuffers=[],this.pressureTextures=[],this.pressureFramebuffers=[],this.scalarIndex=0,this.velIndex=0,this.pressureIndex=0,this.needsScalarReset=!0,this.needsVelocityReset=!0,this.animationLoop=()=>{var i,r;if(this.requestID=window.requestAnimationFrame(this.animationLoop),!this.vis.isVisible()&&this.props.runInBackground!==!0)return;const t=this.cmt.mousePos;if(t&&(this.gl.useProgram(this.prog_paint_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.uniform2f(this.oldMouseLoc,p(t.previous.x,0,this.props.xsize),p(this.props.ysize-t.previous.y,0,this.props.ysize)),this.gl.uniform2f(this.newMouseLoc,p(t.current.x,0,this.props.xsize),p(this.props.ysize-t.current.y,0,this.props.ysize)),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2),this.needsScalarReset){const s=this.props.ysize;this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]);const a=parseInt((i=this.scalarSelect.current)==null?void 0:i.value),n=new Float32Array(this.props.xsize*this.props.ysize);for(let x=0;x<this.props.ysize;x++){const f=Math.floor(x/(s/a))%2;for(let g=0;g<this.props.xsize;g++)Math.floor(g/(s/a))%2+f==1?n[x*this.props.xsize+g]=1:n[x*this.props.xsize+g]=0}w(this.gl,0,0,this.props.xsize,this.props.ysize,n),this.needsScalarReset=!1}if(this.needsVelocityReset){this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),w(this.gl,0,0,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize)),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]);let s;switch((r=this.velocitySelect.current)==null?void 0:r.value){case"curlnoise":s=F(3,this.props.xsize,this.props.ysize,Math.random()*500);break;default:s=new Float32Array(this.props.xsize*this.props.ysize*2);break}R(this.gl,0,0,this.props.xsize,this.props.ysize,s),this.needsVelocityReset=!1}for(let s=0;s<this.range.current.valueAsNumber;s++){this.gl.useProgram(this.prog_advect_scalar),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.scalarFramebuffers[(this.scalarIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.scalarIndex=(this.scalarIndex+1)%2,this.gl.useProgram(this.prog_advect_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2,this.gl.useProgram(this.prog_divergence),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.divFramebuffer),this.gl.drawArrays(this.gl.TRIANGLES,0,6);{this.gl.useProgram(this.prog_solve_pressure);for(let a=0;a<15;a++)this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.divTexture),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.pressureFramebuffers[(this.pressureIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.pressureIndex=(this.pressureIndex+1)%2}this.gl.useProgram(this.prog_apply_pressure_force),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2}switch(this.gl.useProgram(this.prog_render),this.gl.activeTexture(this.gl.TEXTURE0),this.state.displayField){case"PRESSURE":{this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.uniform1f(this.renderMultiplier,1),this.gl.uniform1f(this.renderOffset,.5);break}case"DIVERGENCE":{this.gl.bindTexture(this.gl.TEXTURE_2D,this.divTexture),this.gl.uniform1f(this.renderMultiplier,100),this.gl.uniform1f(this.renderOffset,.5);break}case"SCALAR":default:{this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]),this.gl.uniform1f(this.renderMultiplier,1),this.gl.uniform1f(this.renderOffset,0);break}}this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)},this.state={displayField:"SCALAR"}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float");const u=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,u),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);for(let t=0;t<2;t++){const i=y(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize));this.scalarTextures.push(i);const r=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,i,0),this.scalarFramebuffers.push(r)}for(let t=0;t<2;t++){const i=j(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize*2));this.velTextures.push(i);const r=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,i,0),this.velFramebuffers.push(r)}this.divTexture=y(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize)),this.divFramebuffer=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.divFramebuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.divTexture,0);for(let t=0;t<2;t++){const i=y(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize));this.pressureTextures.push(i);const r=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,i,0),this.pressureFramebuffers.push(r)}{this.prog_advect_scalar=h(this.gl,[l(this.gl,this.gl.VERTEX_SHADER,m),l(this.gl,this.gl.FRAGMENT_SHADER,X)]);const t=this.gl.getAttribLocation(this.prog_advect_scalar,"c_position"),i=this.gl.getUniformLocation(this.prog_advect_scalar,"u_scalar_tex"),r=this.gl.getUniformLocation(this.prog_advect_scalar,"u_vel_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_advect_scalar),this.gl.uniform1i(i,0),this.gl.uniform1i(r,1)}{this.prog_advect_vel=h(this.gl,[l(this.gl,this.gl.VERTEX_SHADER,m),l(this.gl,this.gl.FRAGMENT_SHADER,V)]);const t=this.gl.getAttribLocation(this.prog_advect_vel,"c_position"),i=this.gl.getUniformLocation(this.prog_advect_vel,"u_vel_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_advect_vel),this.gl.uniform1i(i,1)}{this.prog_divergence=h(this.gl,[l(this.gl,this.gl.VERTEX_SHADER,m),l(this.gl,this.gl.FRAGMENT_SHADER,P)]);const t=this.gl.getAttribLocation(this.prog_divergence,"c_position"),i=this.gl.getUniformLocation(this.prog_divergence,"u_vel_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_divergence),this.gl.uniform1i(i,1)}{this.prog_solve_pressure=h(this.gl,[l(this.gl,this.gl.VERTEX_SHADER,m),l(this.gl,this.gl.FRAGMENT_SHADER,G)]);const t=this.gl.getAttribLocation(this.prog_solve_pressure,"c_position"),i=this.gl.getUniformLocation(this.prog_solve_pressure,"u_divergence_tex"),r=this.gl.getUniformLocation(this.prog_solve_pressure,"u_pressure_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_solve_pressure),this.gl.uniform1i(i,2),this.gl.uniform1i(r,3)}{this.prog_apply_pressure_force=h(this.gl,[l(this.gl,this.gl.VERTEX_SHADER,m),l(this.gl,this.gl.FRAGMENT_SHADER,O)]);const t=this.gl.getAttribLocation(this.prog_apply_pressure_force,"c_position"),i=this.gl.getUniformLocation(this.prog_apply_pressure_force,"u_vel_tex"),r=this.gl.getUniformLocation(this.prog_apply_pressure_force,"u_pressure_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_pressure_force),this.gl.uniform1i(i,1),this.gl.uniform1i(r,3)}{this.prog_render=h(this.gl,[l(this.gl,this.gl.VERTEX_SHADER,m),l(this.gl,this.gl.FRAGMENT_SHADER,q)]);const t=this.gl.getAttribLocation(this.prog_render,"c_position"),i=this.gl.getUniformLocation(this.prog_render,"u_scalar_tex"),r=this.gl.getUniformLocation(this.prog_render,"u_vel_tex");this.renderMultiplier=this.gl.getUniformLocation(this.prog_render,"u_multiplier"),this.renderOffset=this.gl.getUniformLocation(this.prog_render,"u_offset"),this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(i,0),this.gl.uniform1i(r,1)}{this.prog_paint_vel=h(this.gl,[l(this.gl,this.gl.VERTEX_SHADER,m),l(this.gl,this.gl.FRAGMENT_SHADER,B)]);const t=this.gl.getAttribLocation(this.prog_paint_vel,"c_position"),i=this.gl.getUniformLocation(this.prog_paint_vel,"u_vel_tex");this.newMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,"u_new_mouse"),this.oldMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,"u_old_mouse"),this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_paint_vel),this.gl.uniform1i(i,1)}this.cmt=new S(this.canvas.current),this.vis=new A(this.canvas.current),this.animationLoop()}componentWillUnmount(){this.cmt.cleanup(),this.vis.cleanup(),window.cancelAnimationFrame(this.requestID)}render(){return e.jsx("div",{style:this.props.style,className:this.props.className,children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-md-8 d-flex",children:e.jsxs("div",{children:[e.jsxs("div",{className:"text-center pb-3",hidden:!this.props.showInstructions,children:[e.jsx(C,{className:"fs-3",style:{transform:"translateY(0.5rem)"}}),e.jsx("span",{className:"fs-5",style:{fontFamily:"Permanent Marker"},children:" Drag to Stir!"})]}),e.jsx("canvas",{className:"border border-dark mx-auto",ref:this.canvas,height:this.props.ysize,width:this.props.xsize})]})}),e.jsx("div",{className:"col-md-4",children:e.jsxs("div",{className:"border border-dark p-3",children:[e.jsx("h6",{children:"Controls"}),e.jsxs("div",{className:"form-group mb-3",children:[e.jsx("label",{className:"form-label",children:"Simulation Speed"}),e.jsx("input",{type:"range",className:"form-range",min:"0",max:"5",step:1,defaultValue:1,ref:this.range})]}),e.jsxs("div",{className:"form-group mb-3",children:[e.jsx("label",{className:"form-label",children:"Scalar Field"}),e.jsxs("select",{className:"form-select mb-3",defaultValue:8,ref:this.scalarSelect,children:[e.jsx("option",{value:1,children:"Empty"}),e.jsx("option",{value:2,children:"Grid 2"}),e.jsx("option",{value:8,children:"Grid 8"}),e.jsx("option",{value:64,children:"Grid 64"})]}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsScalarReset=!0,children:"Reset Scalar"})]}),e.jsxs("div",{className:"form-group mb-3",children:[e.jsx("label",{className:"form-label",children:"Velocity Field"}),e.jsxs("select",{className:"form-select mb-3",defaultValue:8,ref:this.velocitySelect,children:[e.jsx("option",{value:"empty",children:"Empty"}),e.jsx("option",{value:"curlnoise",children:"Curl Noise"})]}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsVelocityReset=!0,children:"Reset Velocity"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("div",{className:"form-check",children:[e.jsx("input",{type:"radio",className:"form-check-input",checked:this.state.displayField==="SCALAR",onChange:()=>this.setState({displayField:"SCALAR"})}),e.jsx("label",{className:"form-check-label",children:"View Scalar"})]}),e.jsxs("div",{className:"form-check",children:[e.jsx("input",{type:"radio",className:"form-check-input",checked:this.state.displayField==="PRESSURE",onChange:()=>this.setState({displayField:"PRESSURE"})}),e.jsx("label",{className:"form-check-label",children:"View Pressure"})]}),e.jsxs("div",{className:"form-check",children:[e.jsx("input",{type:"radio",className:"form-check-input",checked:this.state.displayField==="DIVERGENCE",onChange:()=>this.setState({displayField:"DIVERGENCE"})}),e.jsx("label",{className:"form-check-label",children:"View Divergence"})]})]})]})})]})})}}const W=()=>e.jsx(L,{children:({Citation:v,CitationBank:u})=>e.jsxs(e.Fragment,{children:[e.jsxs(_,{id:"overview",name:"Overview",children:[e.jsx("p",{children:"Our goals are to:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"explain simply the math behind fluid simulation"}),e.jsx("li",{children:"learn how to use the Navier-Stokes equations to simulate fluids"}),e.jsx("li",{children:"provide working code to simulate 2D incompressible flow"})]}),e.jsx("p",{children:"Prerequisites:"}),e.jsx("ul",{children:e.jsx("li",{children:e.jsx(D,{a:N.get("fluid1")})})}),e.jsx("h4",{className:"mt-5 mb-3",children:"A Sneak Preview of What We're Building Towards..."}),e.jsx(b,{title:"",id:"",children:e.jsx(E,{className:"mx-auto",style:{maxWidth:"40em"},xsize:400,ysize:400,showInstructions:!0})})]}),e.jsxs(_,{id:"math-fluid-simulation",name:"Math of Fluid Simulation",children:[e.jsx("h4",{children:"Prerequisites"}),e.jsx("p",{children:"This section makes heavy use of multivariable calculus, matrix multiplication, and systems of equations. so if you're not familiar or need a refresher, I recommend checking out these topics:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Vector Multiplication and Matrix Multiplication",e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(d,{href:"https://www.mathsisfun.com/algebra/matrix-multiplying.html"})}),e.jsx("li",{children:e.jsx(d,{href:"https://mathinsight.org/matrix_vector_multiplication"})})]})]}),e.jsxs("li",{children:["Vector and Scalar Fields",e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(d,{href:"https://www.khanacademy.org/math/multivariable-calculus/thinking-about-multivariable-function/ways-to-represent-multivariable-functions/a/multivariable-functions"})}),e.jsx("li",{children:e.jsx(d,{href:"https://www.khanacademy.org/math/multivariable-calculus/thinking-about-multivariable-function/ways-to-represent-multivariable-functions/a/vector-fields"})})]})]}),e.jsxs("li",{children:["Partial Derivatives",e.jsx("ul",{children:e.jsx("li",{children:e.jsx(d,{href:"https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/partial-derivative-and-gradient-articles/a/introduction-to-partial-derivatives"})})})]}),e.jsxs("li",{children:["The Gradient of Scalar Fields",e.jsx("ul",{children:e.jsx("li",{children:e.jsx(d,{href:"https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/partial-derivative-and-gradient-articles/a/introduction-to-partial-derivatives"})})})]}),e.jsxs("li",{children:["Divergence of a Vector Field",e.jsx("ul",{children:e.jsx("li",{children:e.jsx(d,{href:"https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/divergence-and-curl-articles/a/divergence"})})})]}),e.jsxs("li",{children:["Finite Differences",e.jsx("ul",{children:e.jsx("li",{children:e.jsx(d,{href:"https://en.wikipedia.org/wiki/Finite_difference#Relation_with_derivatives"})})})]})]}),e.jsx("h4",{children:"Notation"}),e.jsx("p",{children:"In this article, we'll use the following notation, which is consistent with that used by Khan Academy:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Lowercase letters and greek letters for scalars.",e.jsx("br",{}),"Examples:",e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(o,{math:"a = 5"})}),e.jsx("li",{children:e.jsx(o,{math:"y = x^2 + 1"})})]})]}),e.jsxs("li",{children:["Lowercase letters and greek letters with an arrow on top for vectors.",e.jsx("br",{}),"Examples:",e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(o,{math:"\\vec v = \\begin{bmatrix} 1 \\\\ -2 \\end{bmatrix}"})}),e.jsx("li",{children:e.jsx(o,{math:"\\vec f = \\nabla (x^2 + y^2)"})})]})]})]}),e.jsx("h4",{children:"Navier Stokes"}),e.jsx("p",{children:"Fluids are complicated. If we wanted to make our simulation perfectly accurate, we would have to simulate at the molecular level, directly handling the elastic collisions of molecules against each other."}),e.jsx("p",{children:"Indeed, this intricate level of simulation is often done when dealing with high temperature plasmas. However, there are quite a few downsides to this. First of all, it's really slow. You'd never be able to do this on real time on consumer hardware. And second of all, it's very complicated. We want code that's easy to write and understand, even if you've never had experience in fluid simulation."}),e.jsx("p",{children:"The good news is that it's not necessary to go to such lengths to have a fairly realistic fluid simulation. Doing so would be complete overkill for most cases, which never see such extreme conditions. So, we'll make a few choice simplifications to make our simulation both fast and easy to understand:"}),e.jsxs("ol",{children:[e.jsxs("li",{children:["We'll assume our fluid is a continuuum",e.jsx(v,{source:"https://en.wikipedia.org/wiki/Derivation_of_the_Navier%E2%80%93Stokes_equations#Basic_assumptions"}),".",e.jsxs("ul",{children:[e.jsx("li",{children:"This means that the fluid is a continous substance, and that we can find the derivatives of fluid properties like pressure and velocity."}),e.jsx("li",{children:"Since all matter is made out of atoms, this isn't actually true, but the effects of this are negligible on the macroscopic scale."})]})]}),e.jsxs("li",{children:["We'll assume our fluid is incompressible.",e.jsx("ul",{children:e.jsxs("li",{children:["In reality of course, no fluid is perfectly incompressible, but it's a close enough approximation. For example, water is nearly aways incompressible. Even for air, we only really need to start worrying about compressibility when the flow approaches Mach 0.3",e.jsx(v,{source:"https://en.wikipedia.org/wiki/Compressible_flow"}),"."]})})]}),e.jsxs("li",{children:["We'll assume our fluid has no friction.",e.jsx("ul",{children:e.jsx("li",{children:`This one is probably the most egregious simplification, but as we'll see, inaccuracies in our simulation give us friction "for free" anyway.`})})]})]}),e.jsx("p",{children:"When we take these assumptions and combine them with the rules of conservation of mass, and the conservation of momentum, we get the incompressible Navier Stokes equations:"}),e.jsx(o,{block:!0,children:String.raw`
        \begin{gather}
          \frac {\partial \vec{u}} {\partial t} =
          -(\vec{u} \cdot \nabla)\vec{u}
          -\frac {1} {\rho} \nabla{p} \\
          \nabla \cdot \vec{u} = 0
        \end{gather}
      `}),"Where:",e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(o,{math:"\\vec u"})," is the velocity vector field"]}),e.jsxs("li",{children:[e.jsx(o,{math:"p"})," is the pressure scalar field"]}),e.jsxs("li",{children:[e.jsx(o,{math:"\\rho"})," is the density of the fluid"]}),e.jsxs("li",{children:[e.jsx(o,{math:"\\frac {\\partial \\vec{u}} {\\partial t}"})," is the derivative of the velocity vector field with respect to time"]})]}),e.jsxs(b,{title:"Clarification on Simplified Equation",children:["In our case, since we're neglecting friction, we've technically listed the ",e.jsx("a",{href:"https://en.wikipedia.org/wiki/Euler_equations_(fluid_dynamics)",children:"Euler equations"}),", which are a special case of the Navier-Stokes equations when the viscosity of the fluid is zero throughout.",e.jsx(v,{source:"https://en.wikipedia.org/wiki/Euler_equations_(fluid_dynamics)"}),". However, most what we're saying applies equally to the Navier-Stokes equations."]}),e.jsxs("p",{children:["If you're interested, a derivation of Navier Stokes can be found on Wikipedia here: ",e.jsx(d,{href:"https://en.wikipedia.org/wiki/Derivation_of_the_Navier%E2%80%93Stokes_equations"}),", but it's not necessary to understand in order to implement a simulation of it."]}),e.jsx("h4",{children:"Understanding the Equations"}),e.jsx("p",{children:"The equations, despite being quite short, are pretty confusing."}),e.jsx("p",{children:"First, we have to understand what's even going on. These equations, as written, are a set of equalities that we can try to apply to a scenario that has:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"A vector field representing velocity at any given point"}),e.jsx("li",{children:"A vector field representing the derivative of this field with respect to time"}),e.jsx("li",{children:"A scalar field representing the pressure at any given point"}),e.jsx("li",{children:"A single scalar value that represents the density of the fluid"})]}),e.jsx("p",{children:"If we have all 4 of these values, then we can check if they satisfy the equations. To do this, imagine we visit every single position on the coordinate plane, and ask: Do the fields at this position satisfy equation 1? Do they satisfy equation 2?"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["If the answer is yes, ",e.jsx("i",{children:"for every single point on the coordinate plane"}),', then we can say "yeah, these fields can represent an incompressible fluid"']}),e.jsxs("li",{children:["If the answer is no, ",e.jsx("i",{children:"for even a single point"}),`, then we must say "no, these fields don't represent an incompressible fluid"`]})]}),e.jsx("p",{children:"That's literally everything these equations let us do right now, mathematically speaking."}),e.jsx("p",{children:"But wait, if we have 3 values, shouldn't we be able to solve for the 4th?"}),e.jsxs("p",{children:["As it turns out, no. The Navier-Stokes equations are notoriously unsolvable in the general case. Given arbitrary initial conditions, we don't even yet know if a globally defined smooth pressure and velocity field that solves the equation exists. This problem, known as Navier-Stokes existence and smoothness, was designated one of the 7 Millenium Prize Problems, and anyone who solves it will recieve a million dollar prize",e.jsx(v,{source:"https://www.claymath.org/sites/default/files/navierstokes.pdf"}),"."]}),e.jsx("p",{children:"That being said, it's definitely possible to numerically approximate solutions, and this is indeed what we have to do. Numerically approximated solutions are never 100% accurate, and since the Navier-Stokes equations are chaotic, we'll eventually diverge from the true state of the fluid."}),e.jsx("p",{children:"For certain applications, like weather forecasting, this can be a real problem. For others, like video games, it's not as big of a deal. We're focusing on the second use case for now, so we won't worry too much about accuracy, especially where it conflicts with performance."}),e.jsxs(b,{title:"Simulating a solution to Navier-Stokes",children:[e.jsx("p",{children:"Let's walk through what we are going to do to in our simulation."}),e.jsx("ol",{}),e.jsxs("p",{children:["In our case, we already have ",e.jsx(o,{math:"{\\vec u}_{t=0}"}),", ",e.jsx(o,{math:"p_{t=0}"})," and ",e.jsx(o,{math:"\\rho"}),", and we want to find ",e.jsx(o,{math:"{\\frac {\\partial \\vec{u}} {\\partial t}}_{t=0}"}),". Then, we'll approximate the velocity field one timestep in the future by adding ",e.jsx(o,{math:"{\\frac {\\partial \\vec{u}} {\\partial t}}_{t=0}"})," to ",e.jsx(o,{math:"{\\vec u}_{t=0}"})," to get ",e.jsx(o,{math:"{\\vec u}_{t=1}"}),'(This method is sometimes called the "Forward Euler Method"',e.jsx(v,{source:"https://en.wikipedia.org/wiki/Euler_method"}),", and it's one of the simplest and most intuitive ways to solve a differential equation.)"]}),e.jsxs("p",{children:["We then use ",e.jsx(o,{math:"{\\vec u}_{t=1}"})," to find ",e.jsx(o,{math:"{p}_{t=1}"}),". We will see that the pressure field can be found directly from velocity field without needing either ",e.jsx(o,{math:"\\frac {\\partial \\vec{u}} {\\partial t}"})," or ",e.jsx(o,{math:"\\rho"}),"."]})]}),e.jsx("h5",{children:"Equation 1"}),e.jsx(o,{block:!0,math:String.raw`\frac {\partial \vec{u}} {\partial t} = -(\vec{u} \cdot \nabla)\vec{u} -\frac {1} {\rho} \nabla{p}`}),e.jsx("ul",{children:e.jsxs("li",{children:[e.jsx(o,{math:String.raw`\frac {\partial \vec{u}} {\partial t}`})," is key here. It"]})})]}),e.jsxs(_,{id:"webgl2-advection",name:"Fluid Advection with WebGL2",children:[e.jsx("p",{children:"Now, we'll approach the heat equation"}),e.jsx(b,{title:"Fluid Advection",id:"fluid-advection-demo",children:e.jsx(M,{className:"mx-auto",style:{maxWidth:"40em"},size:400})})]}),e.jsxs(_,{id:"webgl2-incompressible",name:"Incompressible Fluid with WebGL2",children:[e.jsx("p",{children:"Now, we'll approach the heat equation"}),e.jsx(b,{title:"Fluid Advection",id:"fluid-advection-demo",children:e.jsx(E,{className:"mx-auto",style:{maxWidth:"40em"},xsize:400,ysize:800,showInstructions:!1})})]}),e.jsx(_,{id:"sources",name:"Sources",children:e.jsx(u,{})})]})}),H=I(document.getElementById("root"));H.render(e.jsx(c.StrictMode,{children:e.jsx(W,{})}));
