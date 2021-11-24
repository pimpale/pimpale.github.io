import"./style.7f2dd081.js";import{a as h,j as o,R as g,b as c,F as v}from"./vendor.a4df3017.js";import{A as _}from"./ArticleLayout.cd7af887.js";import{S as u}from"./Section.f71e4728.js";import{A as m}from"./AsideCard.bdb7b55c.js";function n(t,i,e){const s=t.createShader(i);return t.shaderSource(s,e),t.compileShader(s),s}function l(t,i){const e=t.createProgram();for(const r of i)t.attachShader(e,r);if(t.linkProgram(e),t.getProgramParameter(e,t.LINK_STATUS))return e;for(const r of i)t.getShaderParameter(r,t.COMPILE_STATUS)||console.log(t.getShaderInfoLog(r)),t.deleteShader(r);return console.log(t.getProgramInfoLog(e)),t.deleteProgram(e),null}function x(t,i,e){const s=new Uint32Array(i*e),r=t.createTexture();return t.bindTexture(t.TEXTURE_2D,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.R32UI,i,e,0,t.RED_INTEGER,t.UNSIGNED_INT,s),r}const E=`#version 300 es
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
`;class R extends h.Component{constructor(i){super(i);this.canvas=h.createRef(),this.animationLoop=()=>{this.requestID=window.requestAnimationFrame(this.animationLoop),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2");const i=l(this.gl,[n(this.gl,this.gl.VERTEX_SHADER,E),n(this.gl,this.gl.FRAGMENT_SHADER,A)]),e=this.gl.getAttribLocation(i,"position"),s=this.gl.getUniformLocation(i,"width"),r=this.gl.getUniformLocation(i,"height"),a=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,a),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(i),this.gl.uniform1f(s,this.props.width),this.gl.uniform1f(r,this.props.height),this.animationLoop()}componentWillUnmount(){window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return o("canvas",{style:this.props.style,className:this.props.className,ref:this.canvas,height:this.props.height,width:this.props.width})}}const p=`#version 300 es
in vec2 c_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = c_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (c_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,T=`#version 300 es
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
    value =  uvec4(4000000u, 0u, 0u, 0u);
  } else if (v_texCoord.x > 0.99 || v_texCoord.y < 0.01 || v_texCoord.y > 0.99) {
    value =  uvec4(0u, 0u, 0u, 0u);
  } else {
    value = uvec4(sum/4u, 0u, 0u, 0u);
  }
}
`,b=`#version 300 es
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

    float val = float(texture(u_tex, v_texCoord).r)/4000000.0;
    outColor = vec4(inferno(val), 1.0);
}
`;class L extends h.Component{constructor(i){super(i);this.canvas=h.createRef(),this.textures=[],this.framebuffers=[],this.frameCount=0,this.animationLoop=()=>{this.requestID=window.requestAnimationFrame(this.animationLoop),this.gl.useProgram(this.prog_diffuse);for(let e=0;e<1;e++){const s=this.framebuffers[this.frameCount%2],r=this.textures[(this.frameCount+1)%2];this.gl.bindTexture(this.gl.TEXTURE_2D,r),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,s),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.frameCount++}this.gl.useProgram(this.prog_render),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2");const i=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_diffuse=l(this.gl,[n(this.gl,this.gl.VERTEX_SHADER,p),n(this.gl,this.gl.FRAGMENT_SHADER,T)]);const e=this.gl.getAttribLocation(this.prog_diffuse,"c_position"),s=this.gl.getUniformLocation(this.prog_diffuse,"u_tex"),r=this.gl.getUniformLocation(this.prog_diffuse,"u_resolution");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0);for(let a=0;a<2;a++){const f=x(this.gl,this.props.size,this.props.size);this.textures.push(f);const d=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,d),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,f,0),this.framebuffers.push(d)}this.gl.useProgram(this.prog_diffuse),this.gl.uniform1i(s,0),this.gl.uniform2f(r,this.props.size,this.props.size)}{this.prog_render=l(this.gl,[n(this.gl,this.gl.VERTEX_SHADER,p),n(this.gl,this.gl.FRAGMENT_SHADER,b)]);const e=this.gl.getAttribLocation(this.prog_render,"c_position"),s=this.gl.getUniformLocation(this.prog_render,"u_tex");this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(s,0)}this.animationLoop()}componentWillUnmount(){window.cancelAnimationFrame(this.requestID),this.gl.getExtension("WEBGL_lose_context").loseContext()}render(){return o("canvas",{style:this.props.style,className:this.props.className,ref:this.canvas,height:this.props.size,width:this.props.size})}}const F=()=>o(_,{children:({Citation:t,CitationBank:i})=>c(v,{children:[c(u,{id:"overview",name:"Overview",children:[o("p",{children:"Our goals are to:"}),c("ul",{children:[o("li",{children:"demonstrate how use WebGL2 to accelerate computations."}),o("li",{children:"learn how to use the Navier-Stokes equations to simulate fluids."}),o("li",{children:"provide working code to simulate 2D incompressible flow."})]})]}),c(u,{id:"webgl2-setup",name:"Setting up WebGL2",children:[o("p",{children:"First, we'll need to set up WebGL2."}),o(m,{title:"Canvas Setup",id:"canvas-setup-demo",children:o(R,{className:"mx-auto",style:{display:"block"},width:400,height:400})})]}),c(u,{id:"webgl2-heat",name:"Heat Equation with WebGL2",children:[o("p",{children:"Now, we'll approach the heat equation"}),o(m,{title:"Heat Equation",id:"heat-equation-demo",children:o(L,{className:"mx-auto",style:{display:"block"},size:400})})]}),o(u,{id:"sources",name:"Sources",children:o(i,{})})]})});g.render(o(h.StrictMode,{children:o(F,{})}),document.getElementById("root"));
