import"./style.7f2dd081.js";import{a,j as i,b as n,R as g,F as v}from"./vendor.a4df3017.js";import{A as _}from"./ArticleLayout.cd7af887.js";import{S as l}from"./Section.f71e4728.js";import{A as m}from"./AsideCard.bdb7b55c.js";function h(e,s,t){const r=e.createShader(s);return e.shaderSource(r,t),e.compileShader(r),r}function u(e,s){const t=e.createProgram();for(const o of s)e.attachShader(t,o);if(e.linkProgram(t),e.getProgramParameter(t,e.LINK_STATUS))return t;for(const o of s)e.getShaderParameter(o,e.COMPILE_STATUS)||console.log(e.getShaderInfoLog(o)),e.deleteShader(o);return console.log(e.getProgramInfoLog(t)),e.deleteProgram(t),null}function x(e,s,t){const r=new Uint32Array(s*t),o=e.createTexture();return e.bindTexture(e.TEXTURE_2D,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,e.R32UI,s,t,0,e.RED_INTEGER,e.UNSIGNED_INT,r),o}function E(e,s,t){const r=new Uint32Array(s*t);e.texSubImage2D(e.TEXTURE_2D,0,0,0,s,t,e.RED_INTEGER,e.UNSIGNED_INT,r)}const R=`#version 300 es
in vec4 position;
void main() {
  gl_Position = position;
}
`,A=`#version 300 es
precision highp float;

// height and width
uniform float height;
uniform float width;
 
out vec4 outColor;
 
void main() {
  outColor = vec4(gl_FragCoord.x/400.0, gl_FragCoord.y/400.0, 0, 1.0);
}
`;class T extends a.Component{constructor(s){super(s);this.canvas=a.createRef(),this.animationLoop=()=>{this.requestID=window.requestAnimationFrame(this.animationLoop),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2");const s=u(this.gl,[h(this.gl,this.gl.VERTEX_SHADER,R),h(this.gl,this.gl.FRAGMENT_SHADER,A)]),t=this.gl.getAttribLocation(s,"position"),r=this.gl.getUniformLocation(s,"width"),o=this.gl.getUniformLocation(s,"height"),c=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,c),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(s),this.gl.uniform1f(r,this.props.width),this.gl.uniform1f(o,this.props.height),this.animationLoop()}componentWillUnmount(){window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return i("canvas",{style:this.props.style,className:this.props.className,ref:this.canvas,height:this.props.height,width:this.props.width})}}const p=`#version 300 es
in vec2 c_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = c_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (c_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,b=`#version 300 es
precision highp float;
precision highp usampler2D;

// the heat texture
uniform usampler2D u_tex;

// resulution of texture
uniform vec2 u_resolution;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out uvec4 value;
 
void main() {
  // 0 1 2
  // 1
  // 2

  float x_off = 1.0/u_resolution.x;
  float y_off = 1.0/u_resolution.y;

  uint v01 = texture(u_tex, v_texCoord + vec2(-x_off,+0.000)).r;
  uint v10 = texture(u_tex, v_texCoord + vec2(+0.000,-y_off)).r;
  uint v12 = texture(u_tex, v_texCoord + vec2(+0.000,+y_off)).r;
  uint v21 = texture(u_tex, v_texCoord + vec2(+x_off,+0.000)).r;

  uint sum =
          v01 +
    v10 +       v12 +
          v21;

  // finally set value to the texture
  if(v_texCoord.x < 0.01 ) {
    value =  uvec4(0xFFFFFF, 0u, 0u, 0u);
  } else if (v_texCoord.x > 0.99 || v_texCoord.y < 0.01 || v_texCoord.y > 0.99) {
    value =  uvec4(0u, 0u, 0u, 0u);
  } else {
    value = uvec4(sum/4u, 0u, 0u, 0u);
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
`;class L extends a.Component{constructor(s){super(s);this.canvas=a.createRef(),this.range=a.createRef(),this.reset=a.createRef(),this.textures=[],this.framebuffers=[],this.frameCount=0,this.needsReset=!1,this.handleReset=()=>{this.needsReset=!0},this.animationLoop=()=>{if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.gl.useProgram(this.prog_diffuse),this.needsReset){for(let t=0;t<this.textures.length;t++)this.gl.bindTexture(this.gl.TEXTURE_2D,this.textures[t]),E(this.gl,this.props.size,this.props.size);this.needsReset=!1}for(let t=0;t<this.range.current.valueAsNumber;t++){const r=this.framebuffers[this.frameCount%2],o=this.textures[(this.frameCount+1)%2];this.gl.bindTexture(this.gl.TEXTURE_2D,o),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.frameCount++}this.gl.useProgram(this.prog_render),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2");const s=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,s),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_diffuse=u(this.gl,[h(this.gl,this.gl.VERTEX_SHADER,p),h(this.gl,this.gl.FRAGMENT_SHADER,b)]);const t=this.gl.getAttribLocation(this.prog_diffuse,"c_position"),r=this.gl.getUniformLocation(this.prog_diffuse,"u_tex"),o=this.gl.getUniformLocation(this.prog_diffuse,"u_resolution");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0);for(let c=0;c<2;c++){const d=x(this.gl,this.props.size,this.props.size);this.textures.push(d);const f=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,f),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,d,0),this.framebuffers.push(f)}this.gl.useProgram(this.prog_diffuse),this.gl.uniform1i(r,0),this.gl.uniform2f(o,this.props.size,this.props.size)}{this.prog_render=u(this.gl,[h(this.gl,this.gl.VERTEX_SHADER,p),h(this.gl,this.gl.FRAGMENT_SHADER,F)]);const t=this.gl.getAttribLocation(this.prog_render,"c_position"),r=this.gl.getUniformLocation(this.prog_render,"u_tex");this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(r,0)}this.reset.current.addEventListener("click",this.handleReset),this.animationLoop()}componentWillUnmount(){this.reset.current.removeEventListener("click",this.handleReset),window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return i("div",{style:this.props.style,className:this.props.className,children:n("div",{className:"row",children:[i("div",{className:"col-md-8 d-flex",children:i("canvas",{className:"border border-dark",ref:this.canvas,height:this.props.size,width:this.props.size})}),i("div",{className:"col-md-4",children:n("div",{className:"border border-dark p-3 m-3",children:[i("h6",{children:"Controls"}),n("div",{className:"form-group mb-3",children:[i("label",{className:"form-label",children:"Simulation Speed"}),i("input",{type:"range",className:"form-range",min:"0",max:"100",step:1,defaultValue:1,ref:this.range})]}),i("div",{className:"form-group",children:i("button",{className:"btn btn-primary btn-sm",ref:this.reset,children:"Reset"})})]})})]})})}}const S=()=>i(_,{children:({Citation:e,CitationBank:s})=>n(v,{children:[n(l,{id:"overview",name:"Overview",children:[i("p",{children:"Our goals are to:"}),n("ul",{children:[i("li",{children:"demonstrate how use WebGL2 to accelerate computations."}),i("li",{children:"learn how to use the Navier-Stokes equations to simulate fluids."}),i("li",{children:"provide working code to simulate 2D incompressible flow."})]})]}),n(l,{id:"webgl2-setup",name:"Setting up WebGL2",children:[i("p",{children:"First, we'll need to set up WebGL2."}),i(m,{title:"Canvas Setup",id:"canvas-setup-demo",children:i(T,{className:"mx-auto",style:{display:"block"},width:400,height:400})})]}),n(l,{id:"webgl2-heat",name:"Heat Equation with WebGL2",children:[i("p",{children:"Now, we'll approach the heat equation"}),i(m,{title:"Heat Equation",id:"heat-equation-demo",children:i(L,{className:"mx-auto",style:{maxWidth:"40em"},size:400})})]}),i(l,{id:"sources",name:"Sources",children:i(s,{})})]})});g.render(i(a.StrictMode,{children:i(S,{})}),document.getElementById("root"));
