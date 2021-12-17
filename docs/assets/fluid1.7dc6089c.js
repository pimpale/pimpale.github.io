import"./style.7f2dd081.js";import{a as h,j as s,b as a,R as x,F as T}from"./vendor.346b5029.js";import{A as R}from"./ArticleLayout.56699ad5.js";import{S as m}from"./Section.bc1529de.js";import{c as f,A as v}from"./math.61912637.js";function l(e,i,t){const r=e.createShader(i);return e.shaderSource(r,t),e.compileShader(r),r}function p(e,i){const t=e.createProgram();for(const o of i)e.attachShader(t,o);if(e.linkProgram(t),e.getProgramParameter(t,e.LINK_STATUS))return t;for(const o of i)e.getShaderParameter(o,e.COMPILE_STATUS)||console.log(e.getShaderInfoLog(o)),e.deleteShader(o);return console.log(e.getProgramInfoLog(t)),e.deleteProgram(t),null}function E(e,i,t){const r=new Uint32Array(i*t),o=e.createTexture();return e.bindTexture(e.TEXTURE_2D,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,e.R32UI,i,t,0,e.RED_INTEGER,e.UNSIGNED_INT,r),o}function g(e,i,t,r,o,n){e.texSubImage2D(e.TEXTURE_2D,0,i,t,r,o,e.RED_INTEGER,e.UNSIGNED_INT,n)}const A=`#version 300 es
in vec4 position;
void main() {
  gl_Position = position;
}
`,b=`#version 300 es
precision highp float;

// height and width
uniform float height;
uniform float width;
 
out vec4 outColor;
 
void main() {
  outColor = vec4(gl_FragCoord.x/400.0, gl_FragCoord.y/400.0, 0, 1.0);
}
`;class w extends h.Component{constructor(i){super(i);this.canvas=h.createRef(),this.animationLoop=()=>{this.requestID=window.requestAnimationFrame(this.animationLoop),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2");const i=p(this.gl,[l(this.gl,this.gl.VERTEX_SHADER,A),l(this.gl,this.gl.FRAGMENT_SHADER,b)]),t=this.gl.getAttribLocation(i,"position"),r=this.gl.getUniformLocation(i,"width"),o=this.gl.getUniformLocation(i,"height"),n=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(i),this.gl.uniform1f(r,this.props.width),this.gl.uniform1f(o,this.props.height),this.animationLoop()}componentWillUnmount(){window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return s("canvas",{style:this.props.style,className:this.props.className,ref:this.canvas,height:this.props.height,width:this.props.width})}}const _=`#version 300 es
in vec2 c_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = c_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (c_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,L=`#version 300 es
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
`,F=`#version 300 es
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
`;class D extends h.Component{constructor(i){super(i);this.canvas=h.createRef(),this.range=h.createRef(),this.reset=h.createRef(),this.drawSelect=h.createRef(),this.textures=[],this.framebuffers=[],this.frameCount=0,this.needsReset=!1,this.mouseDown=!1,this.mousePos={x:0,y:0},this.handleReset=()=>{this.needsReset=!0},this.handleMouseDown=t=>{this.mouseDown=!0},this.handleMouseUp=t=>{this.mouseDown=!1},this.handleMouseMove=t=>{this.mousePos=this.getMousePos(this.canvas.current,t)},this.animationLoop=()=>{if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.gl.useProgram(this.prog_diffuse),this.mouseDown){this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.controlTexture);const t=this.drawSelect.current.selectedIndex===0?20:5,r=new Uint32Array(t*t);for(let c=0;c<r.length;c++)r[c]=this.drawSelect.current.selectedIndex;const o=f(this.mousePos.x,0+t/2,this.props.size-t/2),n=f(this.props.size-this.mousePos.y,0+t/2,this.props.size-t/2),u=f(o-t/2,0,this.props.size-t),d=f(n-t/2,0,this.props.size-t);g(this.gl,Math.floor(u),Math.floor(d),t,t,r)}this.needsReset&&(this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textures[(this.frameCount+1)%2]),g(this.gl,0,0,this.props.size,this.props.size,new Uint32Array(this.props.size*this.props.size)),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.controlTexture),g(this.gl,0,0,this.props.size,this.props.size,new Uint32Array(this.props.size*this.props.size)),this.needsReset=!1),this.gl.activeTexture(this.gl.TEXTURE0);for(let t=0;t<this.range.current.valueAsNumber;t++){const r=this.framebuffers[this.frameCount%2],o=this.textures[(this.frameCount+1)%2];this.gl.bindTexture(this.gl.TEXTURE_2D,o),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.frameCount++}this.gl.useProgram(this.prog_render),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2");const i=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_diffuse=p(this.gl,[l(this.gl,this.gl.VERTEX_SHADER,_),l(this.gl,this.gl.FRAGMENT_SHADER,L)]);const t=this.gl.getAttribLocation(this.prog_diffuse,"c_position"),r=this.gl.getUniformLocation(this.prog_diffuse,"u_tex"),o=this.gl.getUniformLocation(this.prog_diffuse,"u_ctrl_tex"),n=this.gl.getUniformLocation(this.prog_diffuse,"u_resolution");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0);for(let u=0;u<2;u++){const d=E(this.gl,this.props.size,this.props.size);this.textures.push(d);const c=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,c),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,d,0),this.framebuffers.push(c)}this.gl.useProgram(this.prog_diffuse),this.gl.uniform1i(r,0),this.controlTexture=E(this.gl,this.props.size,this.props.size),this.gl.uniform1i(o,1),this.gl.uniform2f(n,this.props.size,this.props.size)}{this.prog_render=p(this.gl,[l(this.gl,this.gl.VERTEX_SHADER,_),l(this.gl,this.gl.FRAGMENT_SHADER,F)]);const t=this.gl.getAttribLocation(this.prog_render,"c_position"),r=this.gl.getUniformLocation(this.prog_render,"u_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(r,0)}this.reset.current.addEventListener("click",this.handleReset),this.canvas.current.addEventListener("mousedown",this.handleMouseDown),this.canvas.current.addEventListener("mouseup",this.handleMouseUp),this.canvas.current.addEventListener("mousemove",this.handleMouseMove),this.animationLoop()}getMousePos(i,t){const r=i.getBoundingClientRect(),o=i.width/r.width,n=i.height/r.height;return{x:(t.clientX-r.left)*o,y:(t.clientY-r.top)*n}}componentWillUnmount(){this.canvas.current.removeEventListener("mousedown",this.handleMouseDown),this.canvas.current.removeEventListener("mouseup",this.handleMouseUp),this.canvas.current.removeEventListener("mousemove",this.handleMouseMove),this.reset.current.removeEventListener("click",this.handleReset),window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return s("div",{style:this.props.style,className:this.props.className,children:a("div",{className:"row",children:[s("div",{className:"col-md-8 d-flex",children:s("canvas",{className:"border border-dark",ref:this.canvas,height:this.props.size,width:this.props.size})}),s("div",{className:"col-md-4",children:a("div",{className:"border border-dark p-3 m-3",children:[s("h6",{children:"Controls"}),a("div",{className:"form-group mb-3",children:[s("label",{className:"form-label",children:"Simulation Speed"}),s("input",{type:"range",className:"form-range",min:"0",max:"100",step:1,defaultValue:1,ref:this.range})]}),s("div",{className:"form-group mb-3",children:a("select",{className:"form-select",defaultValue:2,ref:this.drawSelect,children:[s("option",{value:0,children:"Erase"}),s("option",{value:1,children:"Draw Cold"}),s("option",{value:2,children:"Draw Hot"})]})}),s("div",{className:"form-group",children:s("button",{className:"btn btn-primary btn-sm",ref:this.reset,children:"Reset"})})]})})]})})}}const S=()=>s(R,{children:({Citation:e,CitationBank:i})=>a(T,{children:[a(m,{id:"overview",name:"Overview",children:[s("p",{children:"Our goals are to:"}),a("ul",{children:[s("li",{children:"demonstrate how use WebGL2 to accelerate computations."}),s("li",{children:"learn how to use the Navier-Stokes equations to simulate fluids."}),s("li",{children:"provide working code to simulate 2D incompressible flow."})]})]}),a(m,{id:"webgl2-setup",name:"Setting up WebGL2",children:[s("p",{children:"First, we'll need to set up WebGL2."}),s(v,{title:"Canvas Setup",id:"canvas-setup-demo",children:s(w,{className:"mx-auto",style:{display:"block"},width:400,height:400})})]}),a(m,{id:"webgl2-heat",name:"Heat Equation with WebGL2",children:[s("p",{children:"Now, we'll approach the heat equation"}),s(v,{title:"Heat Equation",id:"heat-equation-demo",children:s(D,{className:"mx-auto",style:{maxWidth:"40em"},size:400})})]}),s(m,{id:"sources",name:"Sources",children:s(i,{})})]})});x.render(s(h.StrictMode,{children:s(S,{})}),document.getElementById("root"));
