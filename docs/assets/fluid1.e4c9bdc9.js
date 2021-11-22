import"./style.7f2dd081.js";import{a,j as o,R as E,b as n,F as A}from"./vendor.a4df3017.js";import{A as x}from"./ArticleLayout.cd7af887.js";import{S as c}from"./Section.f71e4728.js";import{A as p}from"./AsideCard.bdb7b55c.js";function l(t,e,i){const s=t.createShader(e);return t.shaderSource(s,i),t.compileShader(s),s}function g(t,e){const i=t.createProgram();for(const r of e)t.attachShader(i,r);if(t.linkProgram(i),t.getProgramParameter(i,t.LINK_STATUS))return i;for(const r of e)t.getShaderParameter(r,t.COMPILE_STATUS)||console.log(t.getShaderInfoLog(r)),t.deleteShader(r);return console.log(t.getProgramInfoLog(i)),t.deleteProgram(i),null}function v(t,e){const i=t.createTexture();return t.bindTexture(t.TEXTURE_2D,i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,e.width,e.height,0,t.RGBA,t.UNSIGNED_BYTE,e.data),i}const _=`#version 300 es
in vec4 position;
void main() {
  gl_Position = position;
}
`,T=`#version 300 es
precision highp float;

// height and width
uniform float height;
uniform float width;
 
out vec4 outColor;
 
void main() {
  outColor = vec4(gl_FragCoord.x/400.0, gl_FragCoord.y/400.0, 0, 1.0);
}
`;class R extends a.Component{constructor(e){super(e);this.canvas=a.createRef(),this.animationLoop=()=>{this.requestID=window.requestAnimationFrame(this.animationLoop),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2");const e=g(this.gl,[l(this.gl,this.gl.VERTEX_SHADER,_),l(this.gl,this.gl.FRAGMENT_SHADER,T)]),i=this.gl.getAttribLocation(e,"position"),s=this.gl.getUniformLocation(e,"width"),r=this.gl.getUniformLocation(e,"height"),h=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,h),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW);const u=this.gl.createVertexArray();this.gl.bindVertexArray(u),this.gl.enableVertexAttribArray(i),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(e),this.gl.uniform1f(s,this.props.width),this.gl.uniform1f(r,this.props.height),this.animationLoop()}componentWillUnmount(){window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return o("canvas",{style:this.props.style,className:this.props.className,ref:this.canvas,height:this.props.height,width:this.props.width})}}const b=`#version 300 es
in vec2 c_position;
out vec2 v_texCoord;
uniform vec2 u_resolution;

void main() {
  v_texCoord = c_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (c_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,L=`#version 300 es
precision highp float;

// the heat texture
uniform sampler2D u_heatTex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

out vec4 outColor;
 
void main() {
  // 0 1 2
  // 1
  // 2

  float v01 = texture(u_heatTex, v_texCoord + (-0.005,+0.000)).r;
  float v10 = texture(u_heatTex, v_texCoord + (+0.000,-0.005)).r;
  float v12 = texture(u_heatTex, v_texCoord + (+0.000,+0.005)).r;
  float v21 = texture(u_heatTex, v_texCoord + (+0.005,+0.000)).r;

  float sum =
          v01 +
    v10 +       v12 +
          v21;

  // finally set value to the texture
  if(v_texCoord.x < 0.01 || v_texCoord.x > 0.99 || v_texCoord.y < 0.01 || v_texCoord.y > 0.99) {
    outColor = vec4(1.0, 0.0, 0.0, 1.0);
  } else {
    outColor = vec4(sum/4.0, 0.0, 0.0, 1.0);
  }
}
`;class F extends a.Component{constructor(e){super(e);this.canvas=a.createRef(),this.textures=[],this.framebuffers=[],this.frameCount=0,this.animationLoop=()=>{this.requestID=window.requestAnimationFrame(this.animationLoop);const i=this.framebuffers[this.frameCount%2],s=this.textures[(this.frameCount+1)%2];this.gl.bindTexture(this.gl.TEXTURE_2D,s),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,i),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.frameCount++}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2");const e=g(this.gl,[l(this.gl,this.gl.VERTEX_SHADER,b),l(this.gl,this.gl.FRAGMENT_SHADER,L)]),i=this.gl.getAttribLocation(e,"c_position"),s=this.gl.getUniformLocation(e,"u_heatTex"),r=this.gl.getUniformLocation(e,"u_resolution"),h=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,h),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);const u=this.gl.createVertexArray();this.gl.bindVertexArray(u),this.gl.enableVertexAttribArray(i),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0);for(let d=0;d<2;d++){const m=v(this.gl,new ImageData(this.props.size,this.props.size));this.textures.push(m);const f=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,f),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,m,0),this.framebuffers.push(f)}this.gl.useProgram(e),this.gl.uniform1i(s,0),this.gl.uniform2f(r,this.props.size,this.props.size),this.animationLoop()}componentWillUnmount(){window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return o("canvas",{style:this.props.style,className:this.props.className,ref:this.canvas,height:this.props.size,width:this.props.size})}}const C=()=>o(x,{children:({Citation:t,CitationBank:e})=>n(A,{children:[n(c,{id:"overview",name:"Overview",children:[o("p",{children:"Our goals are to:"}),n("ul",{children:[o("li",{children:"demonstrate how use WebGL2 to accelerate computations."}),o("li",{children:"learn how to use the Navier-Stokes equations to simulate fluids."}),o("li",{children:"provide working code to simulate 2D incompressible flow."})]})]}),n(c,{id:"webgl2-setup",name:"Setting up WebGL2",children:[o("p",{children:"First, we'll need to set up WebGL2."}),o(p,{title:"Canvas Setup",id:"canvas-setup-demo",children:o(R,{className:"mx-auto",style:{display:"block"},width:400,height:400})})]}),n(c,{id:"webgl2-heat",name:"Heat Equation with WebGL2",children:[o("p",{children:"Now, we'll approach the heat equation"}),o(p,{title:"Heat Equation",id:"heat-equation-demo",children:o(F,{className:"mx-auto",style:{display:"block"},size:400})})]}),o(c,{id:"sources",name:"Sources",children:o(e,{})})]})});E.render(o(a.StrictMode,{children:o(C,{})}),document.getElementById("root"));
