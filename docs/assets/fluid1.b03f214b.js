import{a as c,j as e,b as i,R as D,F as S}from"./bootstrap.2ab3de66.js";import{A as U}from"./ArticleLayout.2449aabf.js";import{S as g}from"./Section.85eae012.js";import{H as d}from"./HrefLink.cc4f57e4.js";import{A as E,f as z,S as M,a as I}from"./a11y-dark.4784296c.js";import{i as p}from"./react-katex.m.7efa0123.js";import{A as T}from"./AsideCard.c9d882a1.js";import{d as u,e as a,g as R,o as w,c as b,h as P,a as F,b as L}from"./webgl.90ba2bd8.js";import{c as v}from"./mod.0ccf2658.js";import{c as C}from"./noise.4f227887.js";const N=`#version 300 es
in vec2 a_position;
out vec2 v_texCoord;
void main() {
  // represents the logical coordinate
  v_texCoord = a_position;

  // converts the position (which is from 0 to 1)
  // to clip space (which is from -1 to 1)
  // https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_model_view_projection
  vec2 clipSpace = (a_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,G=`#version 300 es
precision highp float;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the color to print out
out vec4 outColor;
 
void main() {
  // red is the x coordinate of v_texCoord
  // green is the y coordinate of v_texCoord
  // blue is 0
  // alpha is 1 (totally opaque)
  outColor = vec4(v_texCoord, 0, 1.0);
}
`;class X extends c.Component{constructor(o){super(o);this.canvas=c.createRef(),this.animationLoop=()=>{this.requestID=window.requestAnimationFrame(this.animationLoop),this.gl.useProgram(this.program),this.gl.bindVertexArray(this.vao),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2"),this.program=u(this.gl,[a(this.gl,this.gl.VERTEX_SHADER,N),a(this.gl,this.gl.FRAGMENT_SHADER,G)]);const o=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);const t=this.gl.getAttribLocation(this.program,"a_position");this.vao=this.gl.createVertexArray(),this.gl.bindVertexArray(this.vao),this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.animationLoop()}componentWillUnmount(){window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return e("canvas",{style:this.props.style,className:this.props.className,ref:this.canvas,height:this.props.size,width:this.props.size})}}const A=`#version 300 es
in vec2 c_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = c_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (c_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,k=`#version 300 es
precision highp float;
precision highp usampler2D;
precision highp sampler2D;

// the heat texture
uniform sampler2D u_tex;

// the control texture
uniform usampler2D u_ctrl_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;
 
void main() {
  vec2 res = vec2(textureSize(u_tex, 0));
  float x_off = 1.0/res.x;
  float y_off = 1.0/res.y;

  // 0 1 2
  // 1
  // 2

  float v01 = texture(u_tex, v_texCoord + vec2(-x_off,+0.000)).r;
  float v10 = texture(u_tex, v_texCoord + vec2(+0.000,-y_off)).r;
  float v12 = texture(u_tex, v_texCoord + vec2(+0.000,+y_off)).r;
  float v21 = texture(u_tex, v_texCoord + vec2(+x_off,+0.000)).r;

  float sum =
          v01 +
    v10 +       v12 +
          v21;

  uint ctrl = texture(u_ctrl_tex, v_texCoord).r;

  switch(ctrl) {
    case 0u: {
      value = vec4(sum/4.0, 0.0, 0.0, 0.0);
      break;
    }
    case 1u: {
      value = vec4(0.0, 0.0, 0.0, 0.0);
      break;
    }
    default: {
      value = vec4(1.0, 0.0, 0.0, 0.0);
      break;
    }
  }
}
`,W=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp usampler2D;

// the heat texture
uniform sampler2D u_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 outColor;


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
    float val = texture(u_tex, v_texCoord).r;
    outColor = vec4(inferno(val), 1.0);
}
`;class V extends c.Component{constructor(o){super(o);this.canvas=c.createRef(),this.range=c.createRef(),this.drawSelect=c.createRef(),this.textures=[],this.framebuffers=[],this.frameCount=0,this.needsReset=!1,this.mouseDown=!1,this.mousePos={x:0,y:0},this.handleReset=()=>{},this.discardTouchEvent=t=>t.preventDefault(),this.handleMouseDown=t=>{this.mouseDown=!0,this.mousePos=this.getMousePos(this.canvas.current,t)},this.handleMouseUp=t=>{this.mouseDown=!1,this.mousePos=this.getMousePos(this.canvas.current,t)},this.handleMouseMove=t=>{this.mousePos=this.getMousePos(this.canvas.current,t)},this.animationLoop=()=>{if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.gl.useProgram(this.prog_diffuse),this.mouseDown){this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.controlTexture);const t=this.drawSelect.current.selectedIndex===0?10:2,s=t*2,r=new Uint32Array(s*s);for(let h=0;h<r.length;h++)r[h]=this.drawSelect.current.selectedIndex;const l=v(this.mousePos.x-t,0,this.props.size-s),n=v(this.props.size-this.mousePos.y-t,0,this.props.size-s);R(this.gl,Math.floor(l),Math.floor(n),s,s,r)}if(this.needsReset){this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textures[(this.frameCount+1)%2]),w(this.gl,0,0,this.props.size,this.props.size,new Float32Array(this.props.size*this.props.size)),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.controlTexture);const t=new Uint32Array(this.props.size*this.props.size);R(this.gl,0,0,this.props.size,this.props.size,t),this.needsReset=!1}this.gl.activeTexture(this.gl.TEXTURE0);for(let t=0;t<this.range.current.valueAsNumber;t++){const s=this.framebuffers[this.frameCount%2],r=this.textures[(this.frameCount+1)%2];this.gl.bindTexture(this.gl.TEXTURE_2D,r),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,s),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.frameCount++}this.gl.useProgram(this.prog_render),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float");for(let t=0;t<2;t++){const s=b(this.gl,this.props.size,this.props.size,new Float32Array(this.props.size*this.props.size));this.gl.bindTexture(this.gl.TEXTURE_2D,s),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.textures.push(s);const r=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,s,0),this.framebuffers.push(r)}const o=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_diffuse=u(this.gl,[a(this.gl,this.gl.VERTEX_SHADER,A),a(this.gl,this.gl.FRAGMENT_SHADER,k)]);const t=this.gl.getAttribLocation(this.prog_diffuse,"c_position"),s=this.gl.getUniformLocation(this.prog_diffuse,"u_tex"),r=this.gl.getUniformLocation(this.prog_diffuse,"u_ctrl_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_diffuse),this.gl.uniform1i(s,0),this.controlTexture=P(this.gl,this.props.size,this.props.size),this.gl.uniform1i(r,1)}{this.prog_render=u(this.gl,[a(this.gl,this.gl.VERTEX_SHADER,A),a(this.gl,this.gl.FRAGMENT_SHADER,W)]);const t=this.gl.getAttribLocation(this.prog_render,"c_position"),s=this.gl.getUniformLocation(this.prog_render,"u_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(s,0)}this.canvas.current.addEventListener("pointerdown",this.handleMouseDown),this.canvas.current.addEventListener("pointermove",this.handleMouseMove),window.addEventListener("pointerup",this.handleMouseUp),this.canvas.current.addEventListener("touchstart",this.discardTouchEvent),this.canvas.current.addEventListener("touchmove",this.discardTouchEvent),this.canvas.current.addEventListener("touchend",this.discardTouchEvent),this.canvas.current.addEventListener("touchcancel",this.discardTouchEvent),this.animationLoop()}getMousePos(o,t){const s=o.getBoundingClientRect(),r=o.width/s.width,l=o.height/s.height;return{x:(t.clientX-s.left)*r,y:(t.clientY-s.top)*l}}componentWillUnmount(){this.canvas.current.removeEventListener("pointerdown",this.handleMouseDown),this.canvas.current.removeEventListener("pointermove",this.handleMouseMove),window.removeEventListener("pointerup",this.handleMouseUp),this.canvas.current.removeEventListener("touchstart",this.discardTouchEvent),this.canvas.current.removeEventListener("touchmove",this.discardTouchEvent),this.canvas.current.removeEventListener("touchend",this.discardTouchEvent),this.canvas.current.removeEventListener("touchcancel",this.discardTouchEvent),window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return e("div",{style:this.props.style,className:this.props.className,children:i("div",{className:"row",children:[e("div",{className:"col-md-8 d-flex",children:e("canvas",{className:"border border-dark",ref:this.canvas,height:this.props.size,width:this.props.size})}),e("div",{className:"col-md-4",children:i("div",{className:"border border-dark p-3 m-3",children:[e("h6",{children:"Controls"}),i("div",{className:"form-group mb-3",children:[e("label",{className:"form-label",children:"Simulation Speed"}),e("input",{type:"range",className:"form-range",min:"0",max:"100",step:1,defaultValue:1,ref:this.range})]}),e("div",{className:"form-group mb-3",children:i("select",{className:"form-select",defaultValue:2,ref:this.drawSelect,children:[e("option",{value:0,children:"Erase"}),e("option",{value:1,children:"Draw Cold"}),e("option",{value:2,children:"Draw Hot"})]})}),e("div",{className:"form-group",children:e("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsReset=!0,children:"Reset"})})]})})]})})}}const y=`#version 300 es
in vec2 a_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = a_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (a_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,B=`#version 300 es
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
`,O=`#version 300 es
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
`,H=`#version 300 es
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
`;class q extends c.Component{constructor(o){super(o);this.canvas=c.createRef(),this.range=c.createRef(),this.scalarSelect=c.createRef(),this.velocitySelect=c.createRef(),this.scalarTextures=[],this.scalarFramebuffers=[],this.velTextures=[],this.velFramebuffers=[],this.scalarIndex=0,this.velIndex=0,this.needsScalarReset=!0,this.needsVelocityReset=!0,this.mousePos=null,this.handleMouseDown=t=>{const s=this.getMousePos(this.canvas.current,t);this.mousePos={current:s,previous:s}},this.handleMouseUp=t=>{this.mousePos=null},this.handleMouseMove=t=>{!this.mousePos||(this.mousePos={current:this.getMousePos(this.canvas.current,t),previous:this.mousePos.current})},this.discardTouchEvent=t=>t.preventDefault(),this.animationLoop=()=>{var t,s;if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.mousePos&&(this.gl.useProgram(this.prog_paint_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.uniform2f(this.oldMouseLoc,v(this.mousePos.previous.x,0,this.props.size)/this.props.size,v(this.props.size-this.mousePos.previous.y,0,this.props.size)/this.props.size),this.gl.uniform2f(this.newMouseLoc,v(this.mousePos.current.x,0,this.props.size)/this.props.size,v(this.props.size-this.mousePos.current.y,0,this.props.size)/this.props.size),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2),this.needsScalarReset){this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]);const r=parseInt((t=this.scalarSelect.current)==null?void 0:t.value),l=new Float32Array(this.props.size*this.props.size);for(let n=0;n<this.props.size;n++){const h=Math.floor(n/(this.props.size/r))%2;for(let f=0;f<this.props.size;f++)Math.floor(f/(this.props.size/r))%2+h==1?l[n*this.props.size+f]=1:l[n*this.props.size+f]=0}w(this.gl,0,0,this.props.size,this.props.size,l),this.needsScalarReset=!1}if(this.needsVelocityReset){this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]);let r;switch((s=this.velocitySelect.current)==null?void 0:s.value){case"curlnoise":r=C(3,this.props.size,this.props.size,Math.random()*500);break;default:r=new Float32Array(this.props.size*this.props.size*2);break}F(this.gl,0,0,this.props.size,this.props.size,r),this.needsVelocityReset=!1}this.gl.useProgram(this.prog_advect_scalar);for(let r=0;r<this.range.current.valueAsNumber;r++){const l=this.scalarTextures[this.scalarIndex],n=this.scalarFramebuffers[(this.scalarIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,l),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,n),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.scalarIndex=(this.scalarIndex+1)%2}this.gl.useProgram(this.prog_render),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float");const o=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_advect_scalar=u(this.gl,[a(this.gl,this.gl.VERTEX_SHADER,y),a(this.gl,this.gl.FRAGMENT_SHADER,B)]);const t=this.gl.getAttribLocation(this.prog_advect_scalar,"a_position"),s=this.gl.getUniformLocation(this.prog_advect_scalar,"u_scalar_tex"),r=this.gl.getUniformLocation(this.prog_advect_scalar,"u_vel_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0);for(let l=0;l<2;l++){const n=b(this.gl,this.props.size,this.props.size,new Float32Array(this.props.size*this.props.size));this.scalarTextures.push(n);const h=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,h),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,n,0),this.scalarFramebuffers.push(h)}for(let l=0;l<2;l++){new Int32Array(this.props.size*this.props.size*2);const n=L(this.gl,this.props.size,this.props.size,new Float32Array(this.props.size*this.props.size*2));this.velTextures.push(n);const h=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,h),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,n,0),this.velFramebuffers.push(h)}this.gl.useProgram(this.prog_advect_scalar),this.gl.uniform1i(s,0),this.gl.uniform1i(r,1)}{this.prog_render=u(this.gl,[a(this.gl,this.gl.VERTEX_SHADER,y),a(this.gl,this.gl.FRAGMENT_SHADER,O)]);const t=this.gl.getAttribLocation(this.prog_render,"a_position"),s=this.gl.getUniformLocation(this.prog_render,"u_scalar_tex"),r=this.gl.getUniformLocation(this.prog_render,"u_vel_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(s,0),this.gl.uniform1i(r,1)}{this.prog_paint_vel=u(this.gl,[a(this.gl,this.gl.VERTEX_SHADER,y),a(this.gl,this.gl.FRAGMENT_SHADER,H)]);const t=this.gl.getAttribLocation(this.prog_paint_vel,"a_position"),s=this.gl.getUniformLocation(this.prog_paint_vel,"u_vel_tex");this.newMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,"u_new_mouse"),this.oldMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,"u_old_mouse"),this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_paint_vel),this.gl.uniform1i(s,1)}this.canvas.current.addEventListener("pointerdown",this.handleMouseDown),this.canvas.current.addEventListener("pointermove",this.handleMouseMove),window.addEventListener("pointerup",this.handleMouseUp),this.canvas.current.addEventListener("touchstart",this.discardTouchEvent),this.canvas.current.addEventListener("touchmove",this.discardTouchEvent),this.canvas.current.addEventListener("touchend",this.discardTouchEvent),this.canvas.current.addEventListener("touchcancel",this.discardTouchEvent),this.animationLoop()}getMousePos(o,t){const s=o.getBoundingClientRect(),r=o.width/s.width,l=o.height/s.height;return{x:(t.clientX-s.left)*r,y:(t.clientY-s.top)*l}}componentWillUnmount(){this.canvas.current.removeEventListener("pointerdown",this.handleMouseDown),this.canvas.current.removeEventListener("pointermove",this.handleMouseMove),window.removeEventListener("pointerup",this.handleMouseUp),this.canvas.current.removeEventListener("touchstart",this.discardTouchEvent),this.canvas.current.removeEventListener("touchmove",this.discardTouchEvent),this.canvas.current.removeEventListener("touchend",this.discardTouchEvent),this.canvas.current.removeEventListener("touchcancel",this.discardTouchEvent),window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return e("div",{style:this.props.style,className:this.props.className,children:i("div",{className:"row",children:[e("div",{className:"col-md-8 d-flex",children:e("canvas",{className:"border border-dark",ref:this.canvas,height:this.props.size,width:this.props.size})}),e("div",{className:"col-md-4",children:i("div",{className:"border border-dark p-3 m-3",children:[e("h6",{children:"Controls"}),i("div",{className:"form-group mb-3",children:[e("label",{className:"form-label",children:"Simulation Speed"}),e("input",{type:"range",className:"form-range",min:"0",max:"5",step:1,defaultValue:1,ref:this.range})]}),i("div",{className:"form-group mb-3",children:[e("label",{className:"form-label",children:"Scalar Field"}),i("select",{className:"form-select mb-3",defaultValue:8,ref:this.scalarSelect,children:[e("option",{value:1,children:"Empty"}),e("option",{value:2,children:"Grid 2"}),e("option",{value:8,children:"Grid 8"}),e("option",{value:64,children:"Grid 64"})]}),e("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsScalarReset=!0,children:"Reset Scalar"})]}),i("div",{className:"form-group",children:[e("label",{className:"form-label",children:"Velocity Field"}),i("select",{className:"form-select mb-3",defaultValue:8,ref:this.velocitySelect,children:[e("option",{value:"empty",children:"Empty"}),e("option",{value:"curlnoise",children:"Curl Noise"})]}),e("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsVelocityReset=!0,children:"Reset Velocity"})]})]})})]})})}}const x=`#version 300 es
in vec2 c_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = c_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (c_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,Y=`#version 300 es
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
`,Z=`#version 300 es
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
`,$=`#version 300 es
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
`,j=`#version 300 es
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
`,K=`#version 300 es
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
`,J=`#version 300 es
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

  float scalar_val = clamp(texture(u_scalar_tex, v_texCoord).x + u_offset, 0.0, 1.0);
  vec4 field_col = vec4(inferno(scalar_val), 1.0);

  outColor = mix(arrow_col, field_col, arrow_col.a);
}
`,Q=`#version 300 es
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
`;class ee extends c.Component{constructor(o){super(o);this.canvas=c.createRef(),this.range=c.createRef(),this.scalarSelect=c.createRef(),this.velocitySelect=c.createRef(),this.scalarTextures=[],this.scalarFramebuffers=[],this.velTextures=[],this.velFramebuffers=[],this.pressureTextures=[],this.pressureFramebuffers=[],this.scalarIndex=0,this.velIndex=0,this.pressureIndex=0,this.needsScalarReset=!0,this.needsVelocityReset=!0,this.mousePos=null,this.viewPressure=!1,this.handleMouseDown=t=>{const s=this.getMousePos(this.canvas.current,t);this.mousePos={current:s,previous:s}},this.handleMouseUp=t=>{this.mousePos=null},this.handleMouseMove=t=>{!this.mousePos||(this.mousePos={current:this.getMousePos(this.canvas.current,t),previous:this.mousePos.current})},this.discardTouchEvent=t=>t.preventDefault(),this.animationLoop=()=>{var t,s;if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.mousePos&&(this.gl.useProgram(this.prog_paint_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.uniform2f(this.oldMouseLoc,v(this.mousePos.previous.x,0,this.props.xsize),v(this.props.ysize-this.mousePos.previous.y,0,this.props.ysize)),this.gl.uniform2f(this.newMouseLoc,v(this.mousePos.current.x,0,this.props.xsize),v(this.props.ysize-this.mousePos.current.y,0,this.props.ysize)),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2),this.needsScalarReset){const r=this.props.ysize;this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]);const l=parseInt((t=this.scalarSelect.current)==null?void 0:t.value),n=new Float32Array(this.props.xsize*this.props.ysize);for(let h=0;h<this.props.ysize;h++){const f=Math.floor(h/(r/l))%2;for(let _=0;_<this.props.xsize;_++)Math.floor(_/(r/l))%2+f==1?n[h*this.props.xsize+_]=1:n[h*this.props.xsize+_]=0}w(this.gl,0,0,this.props.xsize,this.props.ysize,n),this.needsScalarReset=!1}if(this.needsVelocityReset){this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),w(this.gl,0,0,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize)),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]);let r;switch((s=this.velocitySelect.current)==null?void 0:s.value){case"curlnoise":r=C(3,this.props.xsize,this.props.ysize,Math.random()*500);break;default:r=new Float32Array(this.props.xsize*this.props.ysize*2);break}F(this.gl,0,0,this.props.xsize,this.props.ysize,r),this.needsVelocityReset=!1}for(let r=0;r<this.range.current.valueAsNumber;r++){this.gl.useProgram(this.prog_advect_scalar),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.scalarFramebuffers[(this.scalarIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.scalarIndex=(this.scalarIndex+1)%2,this.gl.useProgram(this.prog_advect_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2,this.gl.useProgram(this.prog_divergence),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.divFramebuffer),this.gl.drawArrays(this.gl.TRIANGLES,0,6);{this.gl.useProgram(this.prog_solve_pressure);for(let l=0;l<15;l++)this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.divTexture),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.pressureFramebuffers[(this.pressureIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.pressureIndex=(this.pressureIndex+1)%2}this.gl.useProgram(this.prog_apply_pressure_force),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2}this.gl.useProgram(this.prog_render),this.viewPressure?(this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.uniform1f(this.renderOffset,.5)):(this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]),this.gl.uniform1f(this.renderOffset,0)),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float");const o=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);for(let t=0;t<2;t++){const s=b(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize));this.scalarTextures.push(s);const r=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,s,0),this.scalarFramebuffers.push(r)}for(let t=0;t<2;t++){const s=L(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize*2));this.velTextures.push(s);const r=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,s,0),this.velFramebuffers.push(r)}this.divTexture=b(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize)),this.divFramebuffer=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.divFramebuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.divTexture,0);for(let t=0;t<2;t++){const s=b(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize));this.pressureTextures.push(s);const r=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,s,0),this.pressureFramebuffers.push(r)}{this.prog_advect_scalar=u(this.gl,[a(this.gl,this.gl.VERTEX_SHADER,x),a(this.gl,this.gl.FRAGMENT_SHADER,Y)]);const t=this.gl.getAttribLocation(this.prog_advect_scalar,"c_position"),s=this.gl.getUniformLocation(this.prog_advect_scalar,"u_scalar_tex"),r=this.gl.getUniformLocation(this.prog_advect_scalar,"u_vel_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_advect_scalar),this.gl.uniform1i(s,0),this.gl.uniform1i(r,1)}{this.prog_advect_vel=u(this.gl,[a(this.gl,this.gl.VERTEX_SHADER,x),a(this.gl,this.gl.FRAGMENT_SHADER,Z)]);const t=this.gl.getAttribLocation(this.prog_advect_vel,"c_position"),s=this.gl.getUniformLocation(this.prog_advect_vel,"u_vel_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_advect_vel),this.gl.uniform1i(s,1)}{this.prog_divergence=u(this.gl,[a(this.gl,this.gl.VERTEX_SHADER,x),a(this.gl,this.gl.FRAGMENT_SHADER,$)]);const t=this.gl.getAttribLocation(this.prog_divergence,"c_position"),s=this.gl.getUniformLocation(this.prog_divergence,"u_vel_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_divergence),this.gl.uniform1i(s,1)}{this.prog_solve_pressure=u(this.gl,[a(this.gl,this.gl.VERTEX_SHADER,x),a(this.gl,this.gl.FRAGMENT_SHADER,j)]);const t=this.gl.getAttribLocation(this.prog_solve_pressure,"c_position"),s=this.gl.getUniformLocation(this.prog_solve_pressure,"u_divergence_tex"),r=this.gl.getUniformLocation(this.prog_solve_pressure,"u_pressure_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_solve_pressure),this.gl.uniform1i(s,2),this.gl.uniform1i(r,3)}{this.prog_apply_pressure_force=u(this.gl,[a(this.gl,this.gl.VERTEX_SHADER,x),a(this.gl,this.gl.FRAGMENT_SHADER,K)]);const t=this.gl.getAttribLocation(this.prog_apply_pressure_force,"c_position"),s=this.gl.getUniformLocation(this.prog_apply_pressure_force,"u_vel_tex"),r=this.gl.getUniformLocation(this.prog_apply_pressure_force,"u_pressure_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_pressure_force),this.gl.uniform1i(s,1),this.gl.uniform1i(r,3)}{this.prog_render=u(this.gl,[a(this.gl,this.gl.VERTEX_SHADER,x),a(this.gl,this.gl.FRAGMENT_SHADER,J)]);const t=this.gl.getAttribLocation(this.prog_render,"c_position"),s=this.gl.getUniformLocation(this.prog_render,"u_scalar_tex"),r=this.gl.getUniformLocation(this.prog_render,"u_vel_tex");this.renderOffset=this.gl.getUniformLocation(this.prog_render,"u_offset"),this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(s,0),this.gl.uniform1i(r,1)}{this.prog_paint_vel=u(this.gl,[a(this.gl,this.gl.VERTEX_SHADER,x),a(this.gl,this.gl.FRAGMENT_SHADER,Q)]);const t=this.gl.getAttribLocation(this.prog_paint_vel,"c_position"),s=this.gl.getUniformLocation(this.prog_paint_vel,"u_vel_tex");this.newMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,"u_new_mouse"),this.oldMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,"u_old_mouse"),this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_paint_vel),this.gl.uniform1i(s,1)}this.canvas.current.addEventListener("pointerdown",this.handleMouseDown),this.canvas.current.addEventListener("pointermove",this.handleMouseMove),window.addEventListener("pointerup",this.handleMouseUp),this.canvas.current.addEventListener("touchstart",this.discardTouchEvent),this.canvas.current.addEventListener("touchmove",this.discardTouchEvent),this.canvas.current.addEventListener("touchend",this.discardTouchEvent),this.canvas.current.addEventListener("touchcancel",this.discardTouchEvent),this.animationLoop()}getMousePos(o,t){const s=o.getBoundingClientRect(),r=o.width/s.width,l=o.height/s.height;return{x:(t.clientX-s.left)*r,y:(t.clientY-s.top)*l}}componentWillUnmount(){this.canvas.current.removeEventListener("pointerdown",this.handleMouseDown),this.canvas.current.removeEventListener("pointermove",this.handleMouseMove),window.removeEventListener("pointerup",this.handleMouseUp),this.canvas.current.removeEventListener("touchstart",this.discardTouchEvent),this.canvas.current.removeEventListener("touchmove",this.discardTouchEvent),this.canvas.current.removeEventListener("touchend",this.discardTouchEvent),this.canvas.current.removeEventListener("touchcancel",this.discardTouchEvent),window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return e("div",{style:this.props.style,className:this.props.className,children:i("div",{className:"row",children:[e("div",{className:"col-md-8 d-flex",children:e("div",{children:e("canvas",{className:"border border-dark mx-auto my-3",ref:this.canvas,height:this.props.ysize,width:this.props.xsize})})}),e("div",{className:"col-md-4",children:i("div",{className:"border border-dark p-3 m-3",children:[e("h6",{children:"Controls"}),i("div",{className:"form-group mb-3",children:[e("label",{className:"form-label",children:"Simulation Speed"}),e("input",{type:"range",className:"form-range",min:"0",max:"5",step:1,defaultValue:1,ref:this.range})]}),i("div",{className:"form-group mb-3",children:[e("label",{className:"form-label",children:"Scalar Field"}),i("select",{className:"form-select mb-3",defaultValue:8,ref:this.scalarSelect,children:[e("option",{value:1,children:"Empty"}),e("option",{value:2,children:"Grid 2"}),e("option",{value:8,children:"Grid 8"}),e("option",{value:64,children:"Grid 64"})]}),e("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsScalarReset=!0,children:"Reset Scalar"})]}),i("div",{className:"form-group mb-3",children:[e("label",{className:"form-label",children:"Velocity Field"}),i("select",{className:"form-select mb-3",defaultValue:8,ref:this.velocitySelect,children:[e("option",{value:"empty",children:"Empty"}),e("option",{value:"curlnoise",children:"Curl Noise"})]}),e("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsVelocityReset=!0,children:"Reset Velocity"})]}),e("div",{className:"form-group",children:i("div",{className:"custom-control custom-checkbox",children:[e("input",{type:"checkbox",className:"custom-control-input",onClick:()=>this.viewPressure=!this.viewPressure}),e("label",{className:"custom-control-label",children:"View Pressure"})]})})]})})]})})}}var te="/assets/WebGL2SetupDemo_tsx.78371353.txt";const se=()=>e(U,{children:({Citation:m,CitationBank:o})=>i(S,{children:[i(g,{id:"overview",name:"Overview",children:[e("p",{children:"Our goals are to:"}),i("ul",{children:[e("li",{children:"demonstrate how use WebGL2 to accelerate computations."}),e("li",{children:"learn how to use the Navier-Stokes equations to simulate fluids."}),e("li",{children:"provide working code to simulate 2D incompressible flow."})]})]}),i(g,{id:"webgl-intro",name:"WebGL Intro",children:[e("h4",{children:"What is WebGL2?"}),i("p",{children:["WebGL is a GPU accelerated graphics API for the web. It's more or less based on OpenGL, so if you're familiar with that, you should find it pretty similar. For now, it's the only way to interface with the GPU on the web. Sometime in the relatively near future we'll hopefully be seeing ",e("a",{href:"https://webgpu.rocks/",children:"WebGPU"})," as well."]}),e("p",{children:"WebGL2 is the newer version of WebGL. The original WebGL was based on OpenGL ES 2.0, but WebGL2 is based on OpenGL ES 3.0. WebGL2 adds a ton of new features, and it's now supported by nearly all modern devices, so there's really no reason not to use it."}),e("p",{children:"In this article, we'll be assuming at least a passing familiarity with WebGL. You should be familiar with:"}),i("ul",{children:[e("li",{children:"how the graphics pipeline works"}),e("li",{children:"what vertex shaders do"}),e("li",{children:"what fragment shaders do"}),e("li",{children:"what a uniform is"})]}),e("p",{children:"If you need a refresher, the following articles are a pretty good source:"}),i("ul",{children:[e("li",{children:e(d,{href:"https://webgl2fundamentals.org/webgl/lessons/webgl-fundamentals.html"})}),e("li",{children:e(d,{href:"https://webgl2fundamentals.org/webgl/lessons/webgl-how-it-works.html"})})]}),e("p",{children:"And here's a link to a WebGL API reference."}),e("ul",{children:e("li",{children:e(d,{href:"https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API"})})})]}),i(g,{id:"webgl2-setup",name:"Working with WebGL2",children:[e("h4",{children:"Why GPU?"}),i("p",{children:["Fluid simulations can be parallelized, which means that the work can be split up into chunks that run independently. Your CPU (if you're running on a reasonably normal computer) probably has 4-32 threads. So, we could theoretically speed up the simulation 32x by taking advantage of multi-threading (although in practice it might not be so high). However, your GPU has the capability to run far more threads simultaneously. Depending on exactly which card you have, you can have a couple thousand threads concurrently running.",e(m,{source:"https://stackoverflow.com/questions/6490572/cuda-how-many-concurrent-threads-in-total"}),"."]}),e("p",{children:"There are downsides to running on the GPU however. First of all, the GPU is limited in what it can do. Secondly, GPU code is deployed in a batch manner, where the same code is given to all cores of the GPU. And finally, you can't use system calls in GPU code. So things like reading from a file or making a network request are not allowed."}),e("p",{children:"Although there are caveats, the GPU is still the best choice for simple fluid simulations like this one. So, let's get started."}),e("h4",{children:"WebGL Setup"}),e("p",{children:"WebGL2 was primary designed as a graphics api, and not really so much as a general purpose GPU compute API. As such, we will have to make use of a few workarounds in order to be able to do what we want."}),e("p",{children:"Let's first look at setting up a canvas:"}),i(T,{title:"Canvas Setup",id:"canvas-setup-demo",children:[e("p",{children:"Code:"}),i(E,{promise:z(te),children:[e(E.Pending,{children:e("div",{className:"spinner-border",role:"status"})}),e(E.Fulfilled,{children:t=>e(M,{className:"mx-5 mb-5",language:"tsx",showLineNumbers:!0,style:I,children:t})}),e(E.Rejected,{children:e("div",{className:"spinner-border",role:"status"})})]}),e("p",{children:"Result:"}),e(X,{className:"mx-auto mb-5",style:{display:"block"},size:400})]}),e("p",{children:"The code is mostly boilerplate associated with setting up WebGL. It draws two triangles, forming a suqare covering the entire clip space. If any of it is confusing, I reccomend reading some of the WebGL resources linked above."})]}),i(g,{id:"webgl2-heat",name:"Heat Equation with WebGL2",children:[e("p",{children:"Now, we'll approach the heat equation"}),e(T,{title:"Heat Equation",id:"heat-equation-demo",children:e(V,{className:"mx-auto",style:{maxWidth:"40em"},size:400})})]}),i(g,{id:"math-fluid-simulation",name:"Math of Fluid Simulation",children:[e("h4",{children:"Prerequisites"}),e("p",{children:"This section makes heavy use of multivariable calculus, matrix multiplication, and systems of equations. so if you're not familiar or need a refresher, I recommend checking out these topics:"}),i("ul",{children:[i("li",{children:["Vector Multiplication and Matrix Multiplication",i("ul",{children:[e("li",{children:e(d,{href:"https://www.mathsisfun.com/algebra/matrix-multiplying.html"})}),e("li",{children:e(d,{href:"https://mathinsight.org/matrix_vector_multiplication"})})]})]}),i("li",{children:["Vector and Scalar Fields",i("ul",{children:[e("li",{children:e(d,{href:"https://www.khanacademy.org/math/multivariable-calculus/thinking-about-multivariable-function/ways-to-represent-multivariable-functions/a/multivariable-functions"})}),e("li",{children:e(d,{href:"https://www.khanacademy.org/math/multivariable-calculus/thinking-about-multivariable-function/ways-to-represent-multivariable-functions/a/vector-fields"})})]})]}),i("li",{children:["Partial Derivatives",e("ul",{children:e("li",{children:e(d,{href:"https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/partial-derivative-and-gradient-articles/a/introduction-to-partial-derivatives"})})})]}),i("li",{children:["The Gradient of Scalar Fields",e("ul",{children:e("li",{children:e(d,{href:"https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/partial-derivative-and-gradient-articles/a/introduction-to-partial-derivatives"})})})]}),i("li",{children:["Divergence of a Vector Field",e("ul",{children:e("li",{children:e(d,{href:"https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/divergence-and-curl-articles/a/divergence"})})})]})]}),e("h4",{children:"Notation"}),e("p",{children:"In this article, we'll use the following notation, which is consistent with that used by Khan Academy:"}),i("ul",{children:[i("li",{children:["Lowercase letters and greek letters for scalars.",e("br",{}),"Examples:",i("ul",{children:[e("li",{children:e(p,{math:"a = 5"})}),e("li",{children:e(p,{math:"y = x^2 + 1"})})]})]}),i("li",{children:["Lowercase letters and greek letters with an arrow on top for vectors.",e("br",{}),"Examples:",i("ul",{children:[e("li",{children:e(p,{math:"\\vec v = \\begin{bmatrix} 1 \\\\ -2 \\end{bmatrix}"})}),e("li",{children:e(p,{math:"\\vec f = \\nabla (x^2 + y^2)"})})]})]})]}),e("h4",{children:"Navier Stokes"}),e("p",{children:"Fluids are complicated. If we wanted to make our simulation perfectly accurate, we would have to simulate at the molecular level, directly handling the elastic collisions of molecules against each other."}),e("p",{children:"Indeed, this intricate level of simulation is often done when dealing with high temperature plasmas. However, there are quite a few downsides to this. First of all, it's really slow. You'd never be able to do this on real time on consumer hardware. And second of all, it's very complicated. We want code that's easy to write and understand, even if you've never had experience in fluid simulation."}),e("p",{children:"The good news is that it's not necessary to go to such lengths to have a fairly realistic fluid simulation. Doing so would be complete overkill for most cases, which never see such extreme conditions. So, we'll make a few choice simplifications to make our simulation both fast and easy to understand:"}),i("ol",{children:[i("li",{children:["We'll assume our fluid is a continuuum",e(m,{source:"https://en.wikipedia.org/wiki/Derivation_of_the_Navier%E2%80%93Stokes_equations#Basic_assumptions"}),".",i("ul",{children:[e("li",{children:"This means that the fluid is a continous substance, and that we can find the derivatives of fluid properties like pressure and velocity."}),e("li",{children:"Since all matter is made out of atoms, this isn't actually true, but the effects of this are negligible on the macroscopic scale."})]})]}),i("li",{children:["We'll assume our fluid is incompressible.",e("ul",{children:i("li",{children:["In reality of course, no fluid is perfectly incompressible, but it's a close enough approximation. For example, water is nearly aways incompressible. Even for air, we only really need to start worrying about compressibility when the flow approaches Mach 0.3",e(m,{source:"https://en.wikipedia.org/wiki/Compressible_flow"}),"."]})})]}),i("li",{children:["We'll assume our fluid has no friction.",e("ul",{children:e("li",{children:`This one is probably the most egregious simplification, but as we'll see, inaccuracies in our simulation give us friction "for free" anyway.`})})]})]}),e("p",{children:"When we take these assumptions and combine them with the rules of conservation of mass, and the conservation of momentum, we get the incompressible Navier Stokes equations:"}),e(p,{block:!0,children:String.raw`
        \begin{gather}
          \frac {\partial \vec{u}} {\partial t} =
          -(\vec{u} \cdot \nabla)\vec{u}
          -\frac {1} {\rho} \nabla{p} \\
          \nabla \cdot \vec{u} = 0
        \end{gather}
      `}),"Where:",i("ul",{children:[i("li",{children:[e(p,{math:"\\vec u"})," is the velocity vector field"]}),i("li",{children:[e(p,{math:"p"})," is the pressure scalar field"]}),i("li",{children:[e(p,{math:"\\rho"})," is the density of the fluid"]}),i("li",{children:[e(p,{math:"t"})," is time"]})]})]}),i(g,{id:"webgl2-advection",name:"Fluid Advection with WebGL2",children:[e("p",{children:"Now, we'll approach the heat equation"}),e(T,{title:"Fluid Advection",id:"fluid-advection-demo",children:e(q,{className:"mx-auto",style:{maxWidth:"40em"},size:400})})]}),i(g,{id:"webgl2-incompressible",name:"Incompressible Fluid with WebGL2",children:[e("p",{children:"Now, we'll approach the heat equation"}),e(T,{title:"Fluid Advection",id:"fluid-advection-demo",children:e(ee,{className:"mx-auto",style:{maxWidth:"40em"},xsize:400,ysize:800})})]}),e(g,{id:"sources",name:"Sources",children:e(o,{})})]})});D.render(e(c.StrictMode,{children:e(se,{})}),document.getElementById("root"));
