import{S as _}from"./style.bb859433.js";import{a as d,j as r,b as u,m as L,R as M,F as N}from"./vendor.6874924e.js";import{A as z}from"./ArticleLayout.9b9a55b6.js";import{c as g,A as x}from"./math.95fa773c.js";function c(t,o,e){const i=t.createShader(o);return t.shaderSource(i,e),t.compileShader(i),i}function p(t,o){const e=t.createProgram();for(const s of o)t.attachShader(e,s);if(t.linkProgram(e),t.getProgramParameter(e,t.LINK_STATUS))return e;for(const s of o)t.getShaderParameter(s,t.COMPILE_STATUS)||console.log(t.getShaderInfoLog(s)),t.deleteShader(s);return console.log(t.getProgramInfoLog(e)),t.deleteProgram(e),null}function A(t,o,e){const i=new Uint32Array(o*e),s=t.createTexture();return t.bindTexture(t.TEXTURE_2D,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.R32UI,o,e,0,t.RED_INTEGER,t.UNSIGNED_INT,i),s}function E(t,o,e,i,s,a){t.texSubImage2D(t.TEXTURE_2D,0,o,e,i,s,t.RED_INTEGER,t.UNSIGNED_INT,a)}function w(t,o,e){const i=new Int32Array(o*e),s=t.createTexture();return t.bindTexture(t.TEXTURE_2D,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.R32I,o,e,0,t.RED_INTEGER,t.INT,i),s}function D(t,o,e,i,s,a){t.texSubImage2D(t.TEXTURE_2D,0,o,e,i,s,t.RED_INTEGER,t.INT,a)}function C(t,o,e,i){const s=t.createTexture();return t.bindTexture(t.TEXTURE_2D,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.RG32I,o,e,0,t.RG_INTEGER,t.INT,i),s}function U(t,o,e,i,s,a){t.texSubImage2D(t.TEXTURE_2D,0,o,e,i,s,t.RG_INTEGER,t.INT,a)}const P=`#version 300 es
in vec4 position;
void main() {
  gl_Position = position;
}
`,X=`#version 300 es
precision highp float;

// height and width
uniform float height;
uniform float width;
 
out vec4 outColor;
 
void main() {
  outColor = vec4(gl_FragCoord.x/400.0, gl_FragCoord.y/400.0, 0, 1.0);
}
`;class G extends d.Component{constructor(o){super(o);this.canvas=d.createRef(),this.animationLoop=()=>{this.requestID=window.requestAnimationFrame(this.animationLoop),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2");const o=p(this.gl,[c(this.gl,this.gl.VERTEX_SHADER,P),c(this.gl,this.gl.FRAGMENT_SHADER,X)]),e=this.gl.getAttribLocation(o,"position"),i=this.gl.getUniformLocation(o,"width"),s=this.gl.getUniformLocation(o,"height"),a=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,a),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(o),this.gl.uniform1f(i,this.props.width),this.gl.uniform1f(s,this.props.height),this.animationLoop()}componentWillUnmount(){window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return r("canvas",{style:this.props.style,className:this.props.className,ref:this.canvas,height:this.props.height,width:this.props.width})}}const I=`#version 300 es
in vec2 c_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = c_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (c_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,B=`#version 300 es
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
`,V=`#version 300 es
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
`;class O extends d.Component{constructor(o){super(o);this.canvas=d.createRef(),this.range=d.createRef(),this.reset=d.createRef(),this.drawSelect=d.createRef(),this.textures=[],this.framebuffers=[],this.frameCount=0,this.needsReset=!1,this.mouseDown=!1,this.mousePos={x:0,y:0},this.handleReset=()=>{this.needsReset=!0},this.handleMouseDown=e=>{this.mouseDown=!0},this.handleMouseUp=e=>{this.mouseDown=!1},this.handleMouseMove=e=>{this.mousePos=this.getMousePos(this.canvas.current,e)},this.animationLoop=()=>{if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.gl.useProgram(this.prog_diffuse),this.mouseDown){this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.controlTexture);const e=this.drawSelect.current.selectedIndex===0?10:2,i=e*2,s=new Uint32Array(i*i);for(let n=0;n<s.length;n++)s[n]=this.drawSelect.current.selectedIndex;const a=g(this.mousePos.x-e,0,this.props.size-i),l=g(this.props.size-this.mousePos.y-e,0,this.props.size-i);E(this.gl,Math.floor(a),Math.floor(l),i,i,s)}if(this.needsReset){this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textures[(this.frameCount+1)%2]),E(this.gl,0,0,this.props.size,this.props.size,new Uint32Array(this.props.size*this.props.size)),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.controlTexture);const e=new Uint32Array(this.props.size*this.props.size);E(this.gl,0,0,this.props.size,this.props.size,e),this.needsReset=!1}this.gl.activeTexture(this.gl.TEXTURE0);for(let e=0;e<this.range.current.valueAsNumber;e++){const i=this.framebuffers[this.frameCount%2],s=this.textures[(this.frameCount+1)%2];this.gl.bindTexture(this.gl.TEXTURE_2D,s),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,i),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.frameCount++}this.gl.useProgram(this.prog_render),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2");const o=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_diffuse=p(this.gl,[c(this.gl,this.gl.VERTEX_SHADER,I),c(this.gl,this.gl.FRAGMENT_SHADER,B)]);const e=this.gl.getAttribLocation(this.prog_diffuse,"c_position"),i=this.gl.getUniformLocation(this.prog_diffuse,"u_tex"),s=this.gl.getUniformLocation(this.prog_diffuse,"u_ctrl_tex"),a=this.gl.getUniformLocation(this.prog_diffuse,"u_resolution");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0);for(let l=0;l<2;l++){const n=A(this.gl,this.props.size,this.props.size);this.gl.bindTexture(this.gl.TEXTURE_2D,n),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.textures.push(n);const h=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,h),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,n,0),this.framebuffers.push(h)}this.gl.useProgram(this.prog_diffuse),this.gl.uniform1i(i,0),this.controlTexture=A(this.gl,this.props.size,this.props.size),this.gl.uniform1i(s,1),this.gl.uniform2f(a,this.props.size,this.props.size)}{this.prog_render=p(this.gl,[c(this.gl,this.gl.VERTEX_SHADER,I),c(this.gl,this.gl.FRAGMENT_SHADER,V)]);const e=this.gl.getAttribLocation(this.prog_render,"c_position"),i=this.gl.getUniformLocation(this.prog_render,"u_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(i,0)}this.reset.current.addEventListener("click",this.handleReset),this.canvas.current.addEventListener("mousedown",this.handleMouseDown),this.canvas.current.addEventListener("mouseup",this.handleMouseUp),this.canvas.current.addEventListener("mousemove",this.handleMouseMove),this.animationLoop()}getMousePos(o,e){const i=o.getBoundingClientRect(),s=o.width/i.width,a=o.height/i.height;return{x:(e.clientX-i.left)*s,y:(e.clientY-i.top)*a}}componentWillUnmount(){this.canvas.current.removeEventListener("mousedown",this.handleMouseDown),this.canvas.current.removeEventListener("mouseup",this.handleMouseUp),this.canvas.current.removeEventListener("mousemove",this.handleMouseMove),this.reset.current.removeEventListener("click",this.handleReset),window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return r("div",{style:this.props.style,className:this.props.className,children:u("div",{className:"row",children:[r("div",{className:"col-md-8 d-flex",children:r("canvas",{className:"border border-dark",ref:this.canvas,height:this.props.size,width:this.props.size})}),r("div",{className:"col-md-4",children:u("div",{className:"border border-dark p-3 m-3",children:[r("h6",{children:"Controls"}),u("div",{className:"form-group mb-3",children:[r("label",{className:"form-label",children:"Simulation Speed"}),r("input",{type:"range",className:"form-range",min:"0",max:"100",step:1,defaultValue:1,ref:this.range})]}),r("div",{className:"form-group mb-3",children:u("select",{className:"form-select",defaultValue:2,ref:this.drawSelect,children:[r("option",{value:0,children:"Erase"}),r("option",{value:1,children:"Draw Cold"}),r("option",{value:2,children:"Draw Hot"})]})}),r("div",{className:"form-group",children:r("button",{className:"btn btn-primary btn-sm",ref:this.reset,children:"Reset"})})]})})]})})}}const y=`#version 300 es
in vec2 c_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = c_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (c_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,W=`#version 300 es
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
  // get the floatwise velocity
  ivec2 ivel = texture(u_vel_tex, v_texCoord).xy;
  vec2 vel = vec2(float(ivel.x)/float(0xFFFFFF), float(ivel.y)/float(0xFFFFFF));

  // now we advect the scalar field:
  // we calculate the scalar value that will be at this location at the next timestep
  float val = textureGood(u_scalar_tex, v_texCoord-vel);

  value = uvec4(val, 0u, 0u, 0u);
}
`,H=`#version 300 es
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

  float arrow_dist = arrow(pxCoord, vel_vec * ARROW_TILE_SIZE);
  vec4 arrow_col = vec4(0, 1.0, 0, clamp(arrow_dist, 0.0, 1.0));

  float scalar_val = float(texture(u_scalar_tex, v_texCoord).r)/float(0xFFFFFF);
  vec4 field_col = vec4(inferno(scalar_val), 1.0);

  outColor = mix(arrow_col, field_col, arrow_col.a);
}
`,k=`#version 300 es
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

float sdSegment( in vec2 p, in vec2 a, in vec2 b )
{
    vec2 pa = p-a, ba = b-a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length( pa - ba*h );
}

void main() {
  // the direction to paint in
  vec2 paintDir = (u_new_mouse - u_old_mouse)*float(0xFFFF);

  float dist = sdSegment(v_texCoord, u_old_mouse, u_new_mouse);

  if(dist < 0.03) {
    ivec4 val = ivec4(int(paintDir.x), int(paintDir.y), 0, 0);
    value = texture(u_vel_tex, v_texCoord) + val;
  } else {
    value = texture(u_vel_tex, v_texCoord);
  }
}
`;function q(t,o){const e=L.makeNoise4D(o);return(i,s)=>e(Math.cos(i*Math.PI*2)/t,Math.sin(i*Math.PI*2)/t,Math.cos(s*Math.PI*2)/t,Math.sin(s*Math.PI*2)/t)}function Y(t,o,e){function i(l,n,h){const v=1e-4,f=l(n+v,h),T=l(n-v,h),R=(f-T)/(2*v),b=l(n,h+v),F=l(n,h-v);return[(b-F)/(2*v),-R]}const s=new Int32Array(t*o*2),a=q(3,e);for(let l=0;l<o;l++)for(let n=0;n<t;n++){const[h,v]=i(a,n/t,l/o),f=t*l+n;s[f*2+0]=h*4095,s[f*2+1]=v*4095}return s}class Z extends d.Component{constructor(o){super(o);this.canvas=d.createRef(),this.range=d.createRef(),this.scalarSelect=d.createRef(),this.velocitySelect=d.createRef(),this.scalarTextures=[],this.scalarFramebuffers=[],this.velTextures=[],this.velFramebuffers=[],this.scalarIndex=0,this.velIndex=0,this.needsScalarReset=!0,this.needsVelocityReset=!0,this.mouseDown=!1,this.prevMousePos={x:0,y:0},this.mousePos={x:0,y:0},this.handleMouseDown=e=>{this.mouseDown=!0},this.handleMouseUp=e=>{this.mouseDown=!1},this.handleMouseMove=e=>{this.prevMousePos=this.mousePos,this.mousePos=this.getMousePos(this.canvas.current,e)},this.animationLoop=()=>{var e,i;if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.mouseDown&&(this.gl.useProgram(this.prog_paint_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.uniform2f(this.oldMouseLoc,g(this.prevMousePos.x,0,this.props.size)/this.props.size,g(this.props.size-this.prevMousePos.y,0,this.props.size)/this.props.size),this.gl.uniform2f(this.newMouseLoc,g(this.mousePos.x,0,this.props.size)/this.props.size,g(this.props.size-this.mousePos.y,0,this.props.size)/this.props.size),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2),this.needsScalarReset){this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]);const s=parseInt((e=this.scalarSelect.current)==null?void 0:e.value),a=new Uint32Array(this.props.size*this.props.size);for(let l=0;l<this.props.size;l++){const n=Math.floor(l/(this.props.size/s))%2;for(let h=0;h<this.props.size;h++)Math.floor(h/(this.props.size/s))%2+n==1?a[l*this.props.size+h]=16777215:a[l*this.props.size+h]=0}E(this.gl,0,0,this.props.size,this.props.size,a),this.needsScalarReset=!1}if(this.needsVelocityReset){this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]);let s;switch((i=this.velocitySelect.current)==null?void 0:i.value){case"curlnoise":s=Y(this.props.size,this.props.size,Math.random()*500);break;default:s=new Int32Array(this.props.size*this.props.size*2);break}U(this.gl,0,0,this.props.size,this.props.size,s),this.needsVelocityReset=!1}this.gl.useProgram(this.prog_advect_scalar);for(let s=0;s<this.range.current.valueAsNumber;s++){const a=this.scalarTextures[this.scalarIndex],l=this.scalarFramebuffers[(this.scalarIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,a),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,l),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.scalarIndex=(this.scalarIndex+1)%2}this.gl.useProgram(this.prog_render),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2");const o=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_advect_scalar=p(this.gl,[c(this.gl,this.gl.VERTEX_SHADER,y),c(this.gl,this.gl.FRAGMENT_SHADER,W)]);const e=this.gl.getAttribLocation(this.prog_advect_scalar,"c_position"),i=this.gl.getUniformLocation(this.prog_advect_scalar,"u_scalar_tex"),s=this.gl.getUniformLocation(this.prog_advect_scalar,"u_vel_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0);for(let a=0;a<2;a++){const l=A(this.gl,this.props.size,this.props.size);this.scalarTextures.push(l);const n=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,n),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,l,0),this.scalarFramebuffers.push(n)}for(let a=0;a<2;a++){const l=new Int32Array(this.props.size*this.props.size*2),n=C(this.gl,this.props.size,this.props.size,l);this.velTextures.push(n);const h=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,h),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,n,0),this.velFramebuffers.push(h)}this.gl.useProgram(this.prog_advect_scalar),this.gl.uniform1i(i,0),this.gl.uniform1i(s,1)}{this.prog_render=p(this.gl,[c(this.gl,this.gl.VERTEX_SHADER,y),c(this.gl,this.gl.FRAGMENT_SHADER,H)]);const e=this.gl.getAttribLocation(this.prog_render,"c_position"),i=this.gl.getUniformLocation(this.prog_render,"u_scalar_tex"),s=this.gl.getUniformLocation(this.prog_render,"u_vel_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(i,0),this.gl.uniform1i(s,1)}{this.prog_paint_vel=p(this.gl,[c(this.gl,this.gl.VERTEX_SHADER,y),c(this.gl,this.gl.FRAGMENT_SHADER,k)]);const e=this.gl.getAttribLocation(this.prog_paint_vel,"c_position"),i=this.gl.getUniformLocation(this.prog_paint_vel,"u_vel_tex");this.newMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,"u_new_mouse"),this.oldMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,"u_old_mouse"),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_paint_vel),this.gl.uniform1i(i,1)}this.canvas.current.addEventListener("mousedown",this.handleMouseDown),this.canvas.current.addEventListener("mouseup",this.handleMouseUp),this.canvas.current.addEventListener("mousemove",this.handleMouseMove),this.animationLoop()}getMousePos(o,e){const i=o.getBoundingClientRect(),s=o.width/i.width,a=o.height/i.height;return{x:(e.clientX-i.left)*s,y:(e.clientY-i.top)*a}}componentWillUnmount(){this.canvas.current.removeEventListener("mousedown",this.handleMouseDown),this.canvas.current.removeEventListener("mouseup",this.handleMouseUp),this.canvas.current.removeEventListener("mousemove",this.handleMouseMove),window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return r("div",{style:this.props.style,className:this.props.className,children:u("div",{className:"row",children:[r("div",{className:"col-md-8 d-flex",children:r("canvas",{className:"border border-dark",ref:this.canvas,height:this.props.size,width:this.props.size})}),r("div",{className:"col-md-4",children:u("div",{className:"border border-dark p-3 m-3",children:[r("h6",{children:"Controls"}),u("div",{className:"form-group mb-3",children:[r("label",{className:"form-label",children:"Simulation Speed"}),r("input",{type:"range",className:"form-range",min:"0",max:"5",step:1,defaultValue:1,ref:this.range})]}),u("div",{className:"form-group mb-3",children:[r("label",{className:"form-label",children:"Scalar Field"}),u("select",{className:"form-select mb-3",defaultValue:8,ref:this.scalarSelect,children:[r("option",{value:1,children:"Empty"}),r("option",{value:2,children:"Grid 2"}),r("option",{value:8,children:"Grid 8"}),r("option",{value:64,children:"Grid 64"})]}),r("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsScalarReset=!0,children:"Reset Scalar"})]}),u("div",{className:"form-group",children:[r("label",{className:"form-label",children:"Velocity Field"}),u("select",{className:"form-select mb-3",defaultValue:8,ref:this.velocitySelect,children:[r("option",{value:"empty",children:"Empty"}),r("option",{value:"curlnoise",children:"Curl Noise"})]}),r("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsVelocityReset=!0,children:"Reset Velocity"})]})]})})]})})}}const m=`#version 300 es
in vec2 c_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = c_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (c_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,$=`#version 300 es
precision highp float;
precision highp isampler2D;

// the scalar texture
uniform isampler2D u_scalar_tex;

// the velocity texture
uniform isampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out ivec4 value;

float textureGood(isampler2D sam, vec2 uv)
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
  // get the floatwise velocity
  ivec2 ivel = texture(u_vel_tex, v_texCoord).xy;
  vec2 vel = vec2(float(ivel.x)/float(0xFFFFFF), float(ivel.y)/float(0xFFFFFF));

  // now we advect the scalar field:
  // we calculate the scalar value that will be at this location at the next timestep
  float val = textureGood(u_scalar_tex, v_texCoord-vel);

  value = ivec4(val, 0, 0, 0);
}
`,j=`#version 300 es
precision highp float;
precision highp isampler2D;

// the velocity texture
uniform isampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out ivec4 value;

vec2 textureGood(isampler2D sam, vec2 uv)
{
    vec2 res = vec2(textureSize(sam, 0));
    vec2 st = uv*res - 0.5;

    vec2 iuv = floor( st );
    vec2 fuv = fract( st );

    vec2 a = vec2(texture( sam, (iuv+vec2(0.5,0.5))/res).xy);
    vec2 b = vec2(texture( sam, (iuv+vec2(1.5,0.5))/res).xy);
    vec2 c = vec2(texture( sam, (iuv+vec2(0.5,1.5))/res).xy);
    vec2 d = vec2(texture( sam, (iuv+vec2(1.5,1.5))/res).xy);

    return mix( mix( a, b, fuv.x),
                mix( c, d, fuv.x), fuv.y );
}

void main() {
  // get the floatwise velocity
  ivec2 ivel = texture(u_vel_tex, v_texCoord).xy;
  vec2 vel = vec2(float(ivel.x)/float(0xFFFFFF), float(ivel.y)/float(0xFFFFFF));

  // now we advect the scalar field:
  // we calculate the scalar value that will be at this location at the next timestep
  vec2 val = textureGood(u_vel_tex, v_texCoord-vel);

  value = ivec4(val, 0, 0);
}
`,K=`#version 300 es
precision highp float;
precision highp isampler2D;

// the velocity texture
uniform isampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out ivec4 value;

void main() {
  // get neighboring cell distances
  vec2 resolution = vec2(textureSize(u_vel_tex, 0));
  float x_off = 1.0/resolution.x;
  float y_off = 1.0/resolution.y;

  // get data
  ivec2 v01 = texture(u_vel_tex, v_texCoord + vec2(-x_off,+0.000)).xy;
  ivec2 v10 = texture(u_vel_tex, v_texCoord + vec2(+0.000,-y_off)).xy;
  ivec2 v12 = texture(u_vel_tex, v_texCoord + vec2(+0.000,+y_off)).xy;
  ivec2 v21 = texture(u_vel_tex, v_texCoord + vec2(+x_off,+0.000)).xy;

  // calculate divergence using finite differences
  // remember, divergence is df/dx + df/dy
  float divergence = float(v21.x - v01.x)/(2.0*x_off)
                   + float(v12.y - v10.y)/(2.0*y_off);

  // return divergence
  value = ivec4(divergence, 0, 0, 0);
}
`,J=`#version 300 es
precision highp float;
precision highp isampler2D;

// the divergence texture
uniform isampler2D u_divergence_tex;

// the pressure texture of the last iteration
uniform isampler2D u_pressure_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out ivec4 value;

void main() {
  // get neighboring cell distances
  vec2 resolution = vec2(textureSize(u_divergence_tex, 0));
  float x_off = 1.0/resolution.x;
  float y_off = 1.0/resolution.y;

  // get previous iteration pressure data
  int p01 = texture(u_pressure_tex, v_texCoord + vec2(-x_off,+0.000)).x;
  int p10 = texture(u_pressure_tex, v_texCoord + vec2(+0.000,-y_off)).x;
  int p12 = texture(u_pressure_tex, v_texCoord + vec2(+0.000,+y_off)).x;
  int p21 = texture(u_pressure_tex, v_texCoord + vec2(+x_off,+0.000)).x;

  // get divergence
  int d11 = texture(u_divergence_tex , v_texCoord).x;

  // use the jacobi method to derive the next iteration of pressure at this location
  int p_next = (d11 + p01 + p10 + p12 + p21)/4;

  value = ivec4(p_next , 0, 0, 0);
}
`,Q=`#version 300 es
precision highp float;
precision highp isampler2D;

// the velocity texture
uniform isampler2D u_vel_tex;

// the pressure texture
uniform isampler2D u_pressure_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out ivec4 value;

void main() {
  // get neighboring cell distances
  vec2 resolution = vec2(textureSize(u_vel_tex, 0));
  float x_off = 1.0/resolution.x;
  float y_off = 1.0/resolution.y;

  // get pressure data
  int p01 = texture(u_pressure_tex, v_texCoord + vec2(-x_off,+0.000)).x;
  int p10 = texture(u_pressure_tex, v_texCoord + vec2(+0.000,-y_off)).x;
  int p12 = texture(u_pressure_tex, v_texCoord + vec2(+0.000,+y_off)).x;
  int p21 = texture(u_pressure_tex, v_texCoord + vec2(+x_off,+0.000)).x;

  // calculate the gradient
  // remember, the gradient is [df/dx, df/dy]
  ivec2 pGradient = ivec2(float(p21 - p01)/(2.0*x_off), float(p12 - p10)/(2.0*y_off));

  // rho is an experimentally determined multiplier intended not to let the simulation diverge
  const int rho = 0xFFFF;

  // adjust the velocity by the pressure gradient
  ivec2 vel = texture(u_vel_tex, v_texCoord).xy + (pGradient/rho);

  value = ivec4(vel, 0, 0);
}
`,ee=`#version 300 es
precision highp float;
precision highp isampler2D;

// the scalar texture
uniform isampler2D u_scalar_tex;

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

  float arrow_dist = arrow(pxCoord, vel_vec * ARROW_TILE_SIZE);
  vec4 arrow_col = vec4(0, 1.0, 0, clamp(arrow_dist, 0.0, 1.0));

  float scalar_val = float(texture(u_scalar_tex, v_texCoord).r)/float(0xFFFFFF);
  vec4 field_col = vec4(inferno(scalar_val), 1.0);

  outColor = mix(arrow_col, field_col, arrow_col.a);
}
`,te=`#version 300 es
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

float sdSegment( in vec2 p, in vec2 a, in vec2 b )
{
    vec2 pa = p-a, ba = b-a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length( pa - ba*h );
}

void main() {
  // the direction to paint in
  vec2 paintDir = (u_new_mouse - u_old_mouse)*float(0xFFFF);

  float dist = sdSegment(v_texCoord, u_old_mouse, u_new_mouse);

  if(dist < 0.03) {
    ivec4 val = ivec4(int(paintDir.x), int(paintDir.y), 0, 0);
    value = texture(u_vel_tex, v_texCoord) + val;
  } else {
    value = texture(u_vel_tex, v_texCoord);
  }
}
`;function se(t,o){const e=L.makeNoise4D(o);return(i,s)=>e(Math.cos(i*Math.PI*2)/t,Math.sin(i*Math.PI*2)/t,Math.cos(s*Math.PI*2)/t,Math.sin(s*Math.PI*2)/t)}function ie(t,o,e){function i(l,n,h){const v=1e-4,f=l(n+v,h),T=l(n-v,h),R=(f-T)/(2*v),b=l(n,h+v),F=l(n,h-v);return[(b-F)/(2*v),-R]}const s=new Int32Array(t*o*2),a=se(3,e);for(let l=0;l<o;l++)for(let n=0;n<t;n++){const[h,v]=i(a,n/t,l/o),f=t*l+n;s[f*2+0]=h*4095,s[f*2+1]=v*4095}return s}class re extends d.Component{constructor(o){super(o);this.canvas=d.createRef(),this.range=d.createRef(),this.scalarSelect=d.createRef(),this.velocitySelect=d.createRef(),this.scalarTextures=[],this.scalarFramebuffers=[],this.velTextures=[],this.velFramebuffers=[],this.pressureTextures=[],this.pressureFramebuffers=[],this.scalarIndex=0,this.velIndex=0,this.pressureIndex=0,this.needsScalarReset=!0,this.needsVelocityReset=!0,this.mouseDown=!1,this.prevMousePos={x:0,y:0},this.mousePos={x:0,y:0},this.handleMouseDown=e=>{this.mouseDown=!0},this.handleMouseUp=e=>{this.mouseDown=!1},this.handleMouseMove=e=>{this.prevMousePos=this.mousePos,this.mousePos=this.getMousePos(this.canvas.current,e)},this.animationLoop=()=>{var e,i;if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.mouseDown&&(this.gl.useProgram(this.prog_paint_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.uniform2f(this.oldMouseLoc,g(this.prevMousePos.x,0,this.props.size)/this.props.size,g(this.props.size-this.prevMousePos.y,0,this.props.size)/this.props.size),this.gl.uniform2f(this.newMouseLoc,g(this.mousePos.x,0,this.props.size)/this.props.size,g(this.props.size-this.mousePos.y,0,this.props.size)/this.props.size),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2),this.needsScalarReset){this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]);const s=parseInt((e=this.scalarSelect.current)==null?void 0:e.value),a=new Int32Array(this.props.size*this.props.size);for(let l=0;l<this.props.size;l++){const n=Math.floor(l/(this.props.size/s))%2;for(let h=0;h<this.props.size;h++)Math.floor(h/(this.props.size/s))%2+n==1?a[l*this.props.size+h]=16777215:a[l*this.props.size+h]=0}D(this.gl,0,0,this.props.size,this.props.size,a),this.needsScalarReset=!1}if(this.needsVelocityReset){this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),D(this.gl,0,0,this.props.size,this.props.size,new Int32Array(this.props.size*this.props.size)),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]);let s;switch((i=this.velocitySelect.current)==null?void 0:i.value){case"curlnoise":s=ie(this.props.size,this.props.size,Math.random()*500);break;default:s=new Int32Array(this.props.size*this.props.size*2);break}U(this.gl,0,0,this.props.size,this.props.size,s),this.needsVelocityReset=!1}for(let s=0;s<this.range.current.valueAsNumber;s++){this.gl.useProgram(this.prog_advect_scalar),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.scalarFramebuffers[(this.scalarIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.scalarIndex=(this.scalarIndex+1)%2,this.gl.useProgram(this.prog_advect_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2,this.gl.useProgram(this.prog_divergence),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.divFramebuffer),this.gl.drawArrays(this.gl.TRIANGLES,0,6);{this.gl.useProgram(this.prog_solve_pressure);for(let a=0;a<10;a++)this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.divTexture),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.pressureFramebuffers[(this.pressureIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.pressureIndex=(this.pressureIndex+1)%2}this.gl.useProgram(this.prog_apply_pressure_force),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2}this.gl.useProgram(this.prog_render),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2");const o=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);for(let e=0;e<2;e++){const i=w(this.gl,this.props.size,this.props.size);this.scalarTextures.push(i);const s=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,s),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,i,0),this.scalarFramebuffers.push(s)}for(let e=0;e<2;e++){const i=new Int32Array(this.props.size*this.props.size*2),s=C(this.gl,this.props.size,this.props.size,i);this.velTextures.push(s);const a=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,a),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,s,0),this.velFramebuffers.push(a)}this.divTexture=w(this.gl,this.props.size,this.props.size),this.divFramebuffer=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.divFramebuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.divTexture,0);for(let e=0;e<2;e++){const i=w(this.gl,this.props.size,this.props.size);this.pressureTextures.push(i);const s=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,s),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,i,0),this.pressureFramebuffers.push(s)}{this.prog_advect_scalar=p(this.gl,[c(this.gl,this.gl.VERTEX_SHADER,m),c(this.gl,this.gl.FRAGMENT_SHADER,$)]);const e=this.gl.getAttribLocation(this.prog_advect_scalar,"c_position"),i=this.gl.getUniformLocation(this.prog_advect_scalar,"u_scalar_tex"),s=this.gl.getUniformLocation(this.prog_advect_scalar,"u_vel_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_advect_scalar),this.gl.uniform1i(i,0),this.gl.uniform1i(s,1)}{this.prog_advect_vel=p(this.gl,[c(this.gl,this.gl.VERTEX_SHADER,m),c(this.gl,this.gl.FRAGMENT_SHADER,j)]);const e=this.gl.getAttribLocation(this.prog_advect_vel,"c_position"),i=this.gl.getUniformLocation(this.prog_advect_vel,"u_vel_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_advect_vel),this.gl.uniform1i(i,1)}{this.prog_divergence=p(this.gl,[c(this.gl,this.gl.VERTEX_SHADER,m),c(this.gl,this.gl.FRAGMENT_SHADER,K)]);const e=this.gl.getAttribLocation(this.prog_divergence,"c_position"),i=this.gl.getUniformLocation(this.prog_divergence,"u_vel_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_divergence),this.gl.uniform1i(i,1)}{this.prog_solve_pressure=p(this.gl,[c(this.gl,this.gl.VERTEX_SHADER,m),c(this.gl,this.gl.FRAGMENT_SHADER,J)]);const e=this.gl.getAttribLocation(this.prog_solve_pressure,"c_position"),i=this.gl.getUniformLocation(this.prog_solve_pressure,"u_divergence_tex"),s=this.gl.getUniformLocation(this.prog_solve_pressure,"u_pressure_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_solve_pressure),this.gl.uniform1i(i,2),this.gl.uniform1i(s,3)}{this.prog_apply_pressure_force=p(this.gl,[c(this.gl,this.gl.VERTEX_SHADER,m),c(this.gl,this.gl.FRAGMENT_SHADER,Q)]);const e=this.gl.getAttribLocation(this.prog_apply_pressure_force,"c_position"),i=this.gl.getUniformLocation(this.prog_apply_pressure_force,"u_vel_tex"),s=this.gl.getUniformLocation(this.prog_apply_pressure_force,"u_pressure_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_pressure_force),this.gl.uniform1i(i,1),this.gl.uniform1i(s,3)}{this.prog_render=p(this.gl,[c(this.gl,this.gl.VERTEX_SHADER,m),c(this.gl,this.gl.FRAGMENT_SHADER,ee)]);const e=this.gl.getAttribLocation(this.prog_render,"c_position"),i=this.gl.getUniformLocation(this.prog_render,"u_scalar_tex"),s=this.gl.getUniformLocation(this.prog_render,"u_vel_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(i,0),this.gl.uniform1i(s,1)}{this.prog_paint_vel=p(this.gl,[c(this.gl,this.gl.VERTEX_SHADER,m),c(this.gl,this.gl.FRAGMENT_SHADER,te)]);const e=this.gl.getAttribLocation(this.prog_paint_vel,"c_position"),i=this.gl.getUniformLocation(this.prog_paint_vel,"u_vel_tex");this.newMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,"u_new_mouse"),this.oldMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,"u_old_mouse"),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_paint_vel),this.gl.uniform1i(i,1)}this.canvas.current.addEventListener("mousedown",this.handleMouseDown),this.canvas.current.addEventListener("mouseup",this.handleMouseUp),this.canvas.current.addEventListener("mousemove",this.handleMouseMove),this.animationLoop()}getMousePos(o,e){const i=o.getBoundingClientRect(),s=o.width/i.width,a=o.height/i.height;return{x:(e.clientX-i.left)*s,y:(e.clientY-i.top)*a}}componentWillUnmount(){this.canvas.current.removeEventListener("mousedown",this.handleMouseDown),this.canvas.current.removeEventListener("mouseup",this.handleMouseUp),this.canvas.current.removeEventListener("mousemove",this.handleMouseMove),window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return r("div",{style:this.props.style,className:this.props.className,children:u("div",{className:"row",children:[r("div",{className:"col-md-8 d-flex",children:r("canvas",{className:"border border-dark",ref:this.canvas,height:this.props.size,width:this.props.size})}),r("div",{className:"col-md-4",children:u("div",{className:"border border-dark p-3 m-3",children:[r("h6",{children:"Controls"}),u("div",{className:"form-group mb-3",children:[r("label",{className:"form-label",children:"Simulation Speed"}),r("input",{type:"range",className:"form-range",min:"0",max:"5",step:1,defaultValue:1,ref:this.range})]}),u("div",{className:"form-group mb-3",children:[r("label",{className:"form-label",children:"Scalar Field"}),u("select",{className:"form-select mb-3",defaultValue:8,ref:this.scalarSelect,children:[r("option",{value:1,children:"Empty"}),r("option",{value:2,children:"Grid 2"}),r("option",{value:8,children:"Grid 8"}),r("option",{value:64,children:"Grid 64"})]}),r("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsScalarReset=!0,children:"Reset Scalar"})]}),u("div",{className:"form-group",children:[r("label",{className:"form-label",children:"Velocity Field"}),u("select",{className:"form-select mb-3",defaultValue:8,ref:this.velocitySelect,children:[r("option",{value:"empty",children:"Empty"}),r("option",{value:"curlnoise",children:"Curl Noise"})]}),r("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsVelocityReset=!0,children:"Reset Velocity"})]})]})})]})})}}const oe=()=>r(z,{children:({Citation:t,CitationBank:o})=>u(N,{children:[u(_,{id:"overview",name:"Overview",children:[r("p",{children:"Our goals are to:"}),u("ul",{children:[r("li",{children:"demonstrate how use WebGL2 to accelerate computations."}),r("li",{children:"learn how to use the Navier-Stokes equations to simulate fluids."}),r("li",{children:"provide working code to simulate 2D incompressible flow."})]})]}),u(_,{id:"webgl2-setup",name:"Setting up WebGL2",children:[r("p",{children:"First, we'll need to set up WebGL2."}),r(x,{title:"Canvas Setup",id:"canvas-setup-demo",children:r(G,{className:"mx-auto",style:{display:"block"},width:400,height:400})})]}),u(_,{id:"webgl2-heat",name:"Heat Equation with WebGL2",children:[r("p",{children:"Now, we'll approach the heat equation"}),r(x,{title:"Heat Equation",id:"heat-equation-demo",children:r(O,{className:"mx-auto",style:{maxWidth:"40em"},size:400})})]}),u(_,{id:"webgl2-advection",name:"Fluid Advection with WebGL2",children:[r("p",{children:"Now, we'll approach the heat equation"}),r(x,{title:"Fluid Advection",id:"fluid-advection-demo",children:r(Z,{className:"mx-auto",style:{maxWidth:"40em"},size:400})})]}),u(_,{id:"webgl2-incompressible",name:"Incompressible Fluid with WebGL2",children:[r("p",{children:"Now, we'll approach the heat equation"}),r(x,{title:"Fluid Advection",id:"fluid-advection-demo",children:r(re,{className:"mx-auto",style:{maxWidth:"40em"},size:400})})]}),r(_,{id:"sources",name:"Sources",children:r(o,{})})]})});M.render(r(d.StrictMode,{children:r(oe,{})}),document.getElementById("root"));
