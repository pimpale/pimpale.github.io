import"./style.7f2dd081.js";import{a as c,j as i,b as l,R as T,F as R}from"./vendor.83e261bd.js";import{A as b}from"./ArticleLayout.cd2cdbcc.js";import{S as m}from"./Section.2bdf19e2.js";import{c as p,A as g}from"./math.3b8b068a.js";function u(e,o,t){const s=e.createShader(o);return e.shaderSource(s,t),e.compileShader(s),s}function v(e,o){const t=e.createProgram();for(const r of o)e.attachShader(t,r);if(e.linkProgram(t),e.getProgramParameter(t,e.LINK_STATUS))return t;for(const r of o)e.getShaderParameter(r,e.COMPILE_STATUS)||console.log(e.getShaderInfoLog(r)),e.deleteShader(r);return console.log(e.getProgramInfoLog(t)),e.deleteProgram(t),null}function _(e,o,t){const s=new Uint32Array(o*t),r=e.createTexture();return e.bindTexture(e.TEXTURE_2D,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,e.R32UI,o,t,0,e.RED_INTEGER,e.UNSIGNED_INT,s),r}function f(e,o,t,s,r,n){e.texSubImage2D(e.TEXTURE_2D,0,o,t,s,r,e.RED_INTEGER,e.UNSIGNED_INT,n)}function A(e,o,t,s){const r=e.createTexture();return e.bindTexture(e.TEXTURE_2D,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,e.RG32I,o,t,0,e.RG_INTEGER,e.INT,s),r}function F(e,o,t,s,r,n){e.texSubImage2D(e.TEXTURE_2D,0,o,t,s,r,e.RG_INTEGER,e.INT,n)}const w=`#version 300 es
in vec4 position;
void main() {
  gl_Position = position;
}
`,L=`#version 300 es
precision highp float;

// height and width
uniform float height;
uniform float width;
 
out vec4 outColor;
 
void main() {
  outColor = vec4(gl_FragCoord.x/400.0, gl_FragCoord.y/400.0, 0, 1.0);
}
`;class D extends c.Component{constructor(o){super(o);this.canvas=c.createRef(),this.animationLoop=()=>{this.requestID=window.requestAnimationFrame(this.animationLoop),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2");const o=v(this.gl,[u(this.gl,this.gl.VERTEX_SHADER,w),u(this.gl,this.gl.FRAGMENT_SHADER,L)]),t=this.gl.getAttribLocation(o,"position"),s=this.gl.getUniformLocation(o,"width"),r=this.gl.getUniformLocation(o,"height"),n=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(o),this.gl.uniform1f(s,this.props.width),this.gl.uniform1f(r,this.props.height),this.animationLoop()}componentWillUnmount(){window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return i("canvas",{style:this.props.style,className:this.props.className,ref:this.canvas,height:this.props.height,width:this.props.width})}}const E=`#version 300 es
in vec2 c_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = c_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (c_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,C=`#version 300 es
precision highp float;
precision highp usampler2D;

// the heat texture
uniform usampler2D u_tex;

// the control texture
uniform usampler2D u_ctrl_tex;

// resulution of texture
uniform vec2 u_resolution;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out uvec4 value;
 
void main() {

  float x_off = 1.0/u_resolution.x;
  float y_off = 1.0/u_resolution.y;

  // 0 1 2
  // 1
  // 2

  uint v01 = texture(u_tex, v_texCoord + vec2(-x_off,+0.000)).r;
  uint v10 = texture(u_tex, v_texCoord + vec2(+0.000,-y_off)).r;
  uint v12 = texture(u_tex, v_texCoord + vec2(+0.000,+y_off)).r;
  uint v21 = texture(u_tex, v_texCoord + vec2(+x_off,+0.000)).r;

  uint sum =
          v01 +
    v10 +       v12 +
          v21;

  uint ctrl = texture(u_ctrl_tex, v_texCoord).r;

  switch(ctrl) {
    case 0u: {
      value = uvec4(sum/4u, 0u, 0u, 0u);
      break;
    }
    case 1u: {
      value = uvec4(0u, 0u, 0u, 0u);
      break;
    }
    default: {
      value = uvec4(0xFFFFFF, 0u, 0u, 0u);
      break;
    }
  }
}
`,U=`#version 300 es
precision highp float;
precision highp usampler2D;

// the heat texture
uniform usampler2D u_tex;

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

    float val = float(texture(u_tex, v_texCoord).r)/float(0xFFFFFF);
    outColor = vec4(inferno(val), 1.0);
}
`;class S extends c.Component{constructor(o){super(o);this.canvas=c.createRef(),this.range=c.createRef(),this.reset=c.createRef(),this.drawSelect=c.createRef(),this.textures=[],this.framebuffers=[],this.frameCount=0,this.needsReset=!1,this.mouseDown=!1,this.mousePos={x:0,y:0},this.handleReset=()=>{this.needsReset=!0},this.handleMouseDown=t=>{this.mouseDown=!0},this.handleMouseUp=t=>{this.mouseDown=!1},this.handleMouseMove=t=>{this.mousePos=this.getMousePos(this.canvas.current,t)},this.animationLoop=()=>{if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.gl.useProgram(this.prog_diffuse),this.mouseDown){this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.controlTexture);const t=this.drawSelect.current.selectedIndex===0?10:2,s=t*2,r=new Uint32Array(s*s);for(let h=0;h<r.length;h++)r[h]=this.drawSelect.current.selectedIndex;const n=p(this.mousePos.x-t,0,this.props.size-s),a=p(this.props.size-this.mousePos.y-t,0,this.props.size-s);f(this.gl,Math.floor(n),Math.floor(a),s,s,r)}if(this.needsReset){this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textures[(this.frameCount+1)%2]),f(this.gl,0,0,this.props.size,this.props.size,new Uint32Array(this.props.size*this.props.size)),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.controlTexture);const t=new Uint32Array(this.props.size*this.props.size);f(this.gl,0,0,this.props.size,this.props.size,t),this.needsReset=!1}this.gl.activeTexture(this.gl.TEXTURE0);for(let t=0;t<this.range.current.valueAsNumber;t++){const s=this.framebuffers[this.frameCount%2],r=this.textures[(this.frameCount+1)%2];this.gl.bindTexture(this.gl.TEXTURE_2D,r),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,s),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.frameCount++}this.gl.useProgram(this.prog_render),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2");const o=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_diffuse=v(this.gl,[u(this.gl,this.gl.VERTEX_SHADER,E),u(this.gl,this.gl.FRAGMENT_SHADER,C)]);const t=this.gl.getAttribLocation(this.prog_diffuse,"c_position"),s=this.gl.getUniformLocation(this.prog_diffuse,"u_tex"),r=this.gl.getUniformLocation(this.prog_diffuse,"u_ctrl_tex"),n=this.gl.getUniformLocation(this.prog_diffuse,"u_resolution");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0);for(let a=0;a<2;a++){const h=_(this.gl,this.props.size,this.props.size);this.textures.push(h);const d=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,d),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,h,0),this.framebuffers.push(d)}this.gl.useProgram(this.prog_diffuse),this.gl.uniform1i(s,0),this.controlTexture=_(this.gl,this.props.size,this.props.size),this.gl.uniform1i(r,1),this.gl.uniform2f(n,this.props.size,this.props.size)}{this.prog_render=v(this.gl,[u(this.gl,this.gl.VERTEX_SHADER,E),u(this.gl,this.gl.FRAGMENT_SHADER,U)]);const t=this.gl.getAttribLocation(this.prog_render,"c_position"),s=this.gl.getUniformLocation(this.prog_render,"u_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(s,0)}this.reset.current.addEventListener("click",this.handleReset),this.canvas.current.addEventListener("mousedown",this.handleMouseDown),this.canvas.current.addEventListener("mouseup",this.handleMouseUp),this.canvas.current.addEventListener("mousemove",this.handleMouseMove),this.animationLoop()}getMousePos(o,t){const s=o.getBoundingClientRect(),r=o.width/s.width,n=o.height/s.height;return{x:(t.clientX-s.left)*r,y:(t.clientY-s.top)*n}}componentWillUnmount(){this.canvas.current.removeEventListener("mousedown",this.handleMouseDown),this.canvas.current.removeEventListener("mouseup",this.handleMouseUp),this.canvas.current.removeEventListener("mousemove",this.handleMouseMove),this.reset.current.removeEventListener("click",this.handleReset),window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return i("div",{style:this.props.style,className:this.props.className,children:l("div",{className:"row",children:[i("div",{className:"col-md-8 d-flex",children:i("canvas",{className:"border border-dark",ref:this.canvas,height:this.props.size,width:this.props.size})}),i("div",{className:"col-md-4",children:l("div",{className:"border border-dark p-3 m-3",children:[i("h6",{children:"Controls"}),l("div",{className:"form-group mb-3",children:[i("label",{className:"form-label",children:"Simulation Speed"}),i("input",{type:"range",className:"form-range",min:"0",max:"100",step:1,defaultValue:1,ref:this.range})]}),i("div",{className:"form-group mb-3",children:l("select",{className:"form-select",defaultValue:2,ref:this.drawSelect,children:[i("option",{value:0,children:"Erase"}),i("option",{value:1,children:"Draw Cold"}),i("option",{value:2,children:"Draw Hot"})]})}),i("div",{className:"form-group",children:i("button",{className:"btn btn-primary btn-sm",ref:this.reset,children:"Reset"})})]})})]})})}}const x=`#version 300 es
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
precision highp usampler2D;
precision highp isampler2D;

// the scalar texture
uniform usampler2D u_scalar_tex;

// the velocity texture
uniform isampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out uvec4 value;

float  textureGood(usampler2D sam, vec2 uv)
{
    vec2 res = vec2(textureSize(sam, 0));
    vec2 st = uv*res - 0.5;

    vec2 iuv = floor( st );
    vec2 fuv = fract( st );

    float a = float(texture( sam, (iuv+vec2(0.5,0.5))/res).r);
    float b = float(texture( sam, (iuv+vec2(1.5,0.5))/res).r);
    float c = float(texture( sam, (iuv+vec2(0.5,1.5))/res).r);
    float d = float(texture( sam, (iuv+vec2(1.5,1.5))/res).r);

    return mix( mix( a, b, fuv.x),
                mix( c, d, fuv.x), fuv.y );
}

void main() {
  ivec2 ivel = texture(u_vel_tex, v_texCoord).rg;
  vec2 vel = vec2(float(ivel.r)/float(0xFFFFFF), float(ivel.g)/float(0xFFFFFF));

  // bilinear interpolate between these three points

  float val = textureGood(u_scalar_tex, v_texCoord+vel);

  value = uvec4(val, 0u, 0u, 0u);
}
`,M=`#version 300 es
precision highp float;
precision highp usampler2D;
precision highp isampler2D;

// the scalar texture
uniform usampler2D u_scalar_tex;

// the velocity texture
uniform isampler2D u_vel_tex;

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

  vec2 vel_vec = vec2(texture(u_vel_tex, tileCenterCoord/resolution))/float(0xFFFFFF);

  float arrow_dist = arrow(pxCoord, vel_vec * ARROW_TILE_SIZE * -5.0);
  vec4 arrow_col = vec4(0, 1.0, 0, clamp(arrow_dist, 0.0, 1.0));

  float scalar_val = float(texture(u_scalar_tex, v_texCoord).r)/float(0xFFFFFF);
  vec4 field_col = vec4(inferno(scalar_val), 1.0);

  outColor = mix(arrow_col, field_col, arrow_col.a);
}
`,I=`#version 300 es
precision highp float;
precision highp isampler2D;

// the velocity texture
uniform isampler2D u_vel_tex;

// old normalized mouse position
uniform vec2 u_old_mouse;
// new normalized mouse position
uniform vec2 u_new_mouse;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out ivec4 value;

void main() {
  // the direction to paint in
  vec2 paintDir = normalize(u_old_mouse - u_new_mouse)*float(0xFFF);

  float dist = length(u_new_mouse - v_texCoord);

  if(dist < 0.05) {
    ivec4 val = ivec4(int(paintDir.x), int(paintDir.y), 0, 0);
    value = texture(u_vel_tex, v_texCoord) + val;
  } else {
    value = texture(u_vel_tex, v_texCoord);
  }
}
`;class y extends c.Component{constructor(o){super(o);this.canvas=c.createRef(),this.range=c.createRef(),this.reset=c.createRef(),this.backgroundSelect=c.createRef(),this.scalarTextures=[],this.scalarFramebuffers=[],this.velTextures=[],this.velFramebuffers=[],this.scalarIndex=0,this.velIndex=0,this.needsReset=!1,this.mouseDown=!1,this.prevMousePos={x:0,y:0},this.mousePos={x:0,y:0},this.handleReset=()=>{this.needsReset=!0},this.handleMouseDown=t=>{this.mouseDown=!0},this.handleMouseUp=t=>{this.mouseDown=!1},this.handleMouseMove=t=>{this.prevMousePos=this.mousePos,this.mousePos=this.getMousePos(this.canvas.current,t)},this.animationLoop=()=>{var t;if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.mouseDown&&(this.gl.useProgram(this.prog_paint_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.uniform2f(this.oldMouseLoc,p(this.prevMousePos.x,0,this.props.size)/this.props.size,p(this.props.size-this.prevMousePos.y,0,this.props.size)/this.props.size),this.gl.uniform2f(this.newMouseLoc,p(this.mousePos.x,0,this.props.size)/this.props.size,p(this.props.size-this.mousePos.y,0,this.props.size)/this.props.size),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2),this.needsReset){this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]);const s=parseInt((t=this.backgroundSelect.current)==null?void 0:t.value),r=new Uint32Array(this.props.size*this.props.size);for(let a=0;a<this.props.size;a++){const h=Math.floor(a/(this.props.size/s))%2;for(let d=0;d<this.props.size;d++)Math.floor(d/(this.props.size/s))%2+h==1?r[a*this.props.size+d]=16777215:r[a*this.props.size+d]=0}f(this.gl,0,0,this.props.size,this.props.size,r),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]);const n=new Int32Array(this.props.size*this.props.size*2);F(this.gl,0,0,this.props.size,this.props.size,n),this.needsReset=!1}this.gl.useProgram(this.prog_diffuse);for(let s=0;s<this.range.current.valueAsNumber;s++){const r=this.scalarTextures[this.scalarIndex],n=this.scalarFramebuffers[(this.scalarIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,r),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,n),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.scalarIndex=(this.scalarIndex+1)%2}this.gl.useProgram(this.prog_render),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2");const o=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_diffuse=v(this.gl,[u(this.gl,this.gl.VERTEX_SHADER,x),u(this.gl,this.gl.FRAGMENT_SHADER,N)]);const t=this.gl.getAttribLocation(this.prog_diffuse,"c_position"),s=this.gl.getUniformLocation(this.prog_diffuse,"u_scalar_tex"),r=this.gl.getUniformLocation(this.prog_diffuse,"u_vel_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0);for(let n=0;n<2;n++){const a=_(this.gl,this.props.size,this.props.size);this.scalarTextures.push(a);const h=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,h),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,a,0),this.scalarFramebuffers.push(h)}for(let n=0;n<2;n++){const a=new Int32Array(this.props.size*this.props.size*2),h=A(this.gl,this.props.size,this.props.size,a);this.velTextures.push(h);const d=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,d),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,h,0),this.velFramebuffers.push(d)}this.gl.useProgram(this.prog_diffuse),this.gl.uniform1i(s,0),this.gl.uniform1i(r,1)}{this.prog_render=v(this.gl,[u(this.gl,this.gl.VERTEX_SHADER,x),u(this.gl,this.gl.FRAGMENT_SHADER,M)]);const t=this.gl.getAttribLocation(this.prog_render,"c_position"),s=this.gl.getUniformLocation(this.prog_render,"u_scalar_tex"),r=this.gl.getUniformLocation(this.prog_render,"u_vel_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(s,0),this.gl.uniform1i(r,1)}{this.prog_paint_vel=v(this.gl,[u(this.gl,this.gl.VERTEX_SHADER,x),u(this.gl,this.gl.FRAGMENT_SHADER,I)]);const t=this.gl.getAttribLocation(this.prog_paint_vel,"c_position"),s=this.gl.getUniformLocation(this.prog_paint_vel,"u_vel_tex");this.newMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,"u_new_mouse"),this.oldMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,"u_old_mouse"),this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_paint_vel),this.gl.uniform1i(s,1)}this.reset.current.addEventListener("click",this.handleReset),this.canvas.current.addEventListener("mousedown",this.handleMouseDown),this.canvas.current.addEventListener("mouseup",this.handleMouseUp),this.canvas.current.addEventListener("mousemove",this.handleMouseMove),this.animationLoop()}getMousePos(o,t){const s=o.getBoundingClientRect(),r=o.width/s.width,n=o.height/s.height;return{x:(t.clientX-s.left)*r,y:(t.clientY-s.top)*n}}componentWillUnmount(){this.canvas.current.removeEventListener("mousedown",this.handleMouseDown),this.canvas.current.removeEventListener("mouseup",this.handleMouseUp),this.canvas.current.removeEventListener("mousemove",this.handleMouseMove),this.reset.current.removeEventListener("click",this.handleReset),window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return i("div",{style:this.props.style,className:this.props.className,children:l("div",{className:"row",children:[i("div",{className:"col-md-8 d-flex",children:i("canvas",{className:"border border-dark",ref:this.canvas,height:this.props.size,width:this.props.size})}),i("div",{className:"col-md-4",children:l("div",{className:"border border-dark p-3 m-3",children:[i("h6",{children:"Controls"}),l("div",{className:"form-group mb-3",children:[i("label",{className:"form-label",children:"Simulation Speed"}),i("input",{type:"range",className:"form-range",min:"0",max:"5",step:1,defaultValue:1,ref:this.range})]}),i("div",{className:"form-group mb-3",children:l("select",{className:"form-select",defaultValue:1,ref:this.backgroundSelect,children:[i("option",{value:1,children:"Empty"}),i("option",{value:2,children:"Checkerboard 2"}),i("option",{value:8,children:"Checkerboard 8"}),i("option",{value:64,children:"Checkerboard 64"})]})}),i("div",{className:"form-group",children:i("button",{className:"btn btn-primary btn-sm",ref:this.reset,children:"Reset"})})]})})]})})}}const P=()=>i(b,{children:({Citation:e,CitationBank:o})=>l(R,{children:[l(m,{id:"overview",name:"Overview",children:[i("p",{children:"Our goals are to:"}),l("ul",{children:[i("li",{children:"demonstrate how use WebGL2 to accelerate computations."}),i("li",{children:"learn how to use the Navier-Stokes equations to simulate fluids."}),i("li",{children:"provide working code to simulate 2D incompressible flow."})]})]}),l(m,{id:"webgl2-setup",name:"Setting up WebGL2",children:[i("p",{children:"First, we'll need to set up WebGL2."}),i(g,{title:"Canvas Setup",id:"canvas-setup-demo",children:i(D,{className:"mx-auto",style:{display:"block"},width:400,height:400})})]}),l(m,{id:"webgl2-heat",name:"Heat Equation with WebGL2",children:[i("p",{children:"Now, we'll approach the heat equation"}),i(g,{title:"Heat Equation",id:"heat-equation-demo",children:i(S,{className:"mx-auto",style:{maxWidth:"40em"},size:400})})]}),l(m,{id:"webgl2-advection",name:"Fluid Advection with WebGL2",children:[i("p",{children:"Now, we'll approach the heat equation"}),i(g,{title:"Fluid Advection",id:"fluid-advection-demo",children:i(y,{className:"mx-auto",style:{maxWidth:"40em"},size:400})})]}),i(m,{id:"sources",name:"Sources",children:i(o,{})})]})});T.render(i(c.StrictMode,{children:i(P,{})}),document.getElementById("root"));
