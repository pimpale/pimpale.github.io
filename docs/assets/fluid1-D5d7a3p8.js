import"./modulepreload-polyfill-B5Qt9EMX.js";import{R as n,j as e,c as y}from"./client-eAXdjRVy.js";import{A}from"./ArticleLayout-gxaS_6bu.js";import{S as h}from"./Section-DvYo-wXl.js";import{H as c}from"./HrefLink-uO8URVho.js";import{A as p}from"./index-Box98iqj.js";import{f as T}from"./load-Cs5R6B8i.js";import{i as d}from"./react-katex.m-p1UAmzT_.js";import{A as a}from"./AsideCard-DKxCtZGD.js";import{a as g,b as u,h as f,i as E,l as L,k as G}from"./webgl-BxJ6eXGr.js";import{c as b}from"./math-BinNTQH2.js";import{V as R}from"./visibility-B6XuZukV.js";import{C as W}from"./canvas-CKFiyhQ_.js";import{A as D}from"./arrow-90deg-down-Rl6lR2ww.js";import{A as S,a as C}from"./Articles-CeyohyuX.js";import"./bootstrap-BT072RUE.js";import{h as U,a as k}from"./a11y-dark-BChzas8M.js";import"./Layout-B656iKmb.js";import"./parse-B8JLjtxJ.js";const F=`#version 300 es
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
`,N=`#version 300 es
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
`;class P extends n.Component{constructor(i){super(i),this.canvas=n.createRef(),this.animationLoop=()=>{this.requestID=window.requestAnimationFrame(this.animationLoop),this.gl.useProgram(this.program),this.gl.bindVertexArray(this.vao),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2"),this.program=g(this.gl,[u(this.gl,this.gl.VERTEX_SHADER,F),u(this.gl,this.gl.FRAGMENT_SHADER,N)]);const i=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);const s=this.gl.getAttribLocation(this.program,"a_position");this.vao=this.gl.createVertexArray(),this.gl.bindVertexArray(this.vao),this.gl.enableVertexAttribArray(s),this.gl.vertexAttribPointer(s,2,this.gl.FLOAT,!1,0,0),this.animationLoop()}componentWillUnmount(){window.cancelAnimationFrame(this.requestID)}render(){return e.jsx("canvas",{style:this.props.style,className:this.props.className,ref:this.canvas,height:this.props.size,width:this.props.size})}}const w=`#version 300 es
in vec2 c_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = c_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (c_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,I=`#version 300 es
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
`,q=`#version 300 es
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
`;class j extends n.Component{constructor(i){super(i),this.canvas=n.createRef(),this.simSpeedRange=n.createRef(),this.drawSelect=n.createRef(),this.textures=[],this.framebuffers=[],this.frameCount=0,this.needsReset=!1,this.animationLoop=()=>{if(this.requestID=window.requestAnimationFrame(this.animationLoop),!this.vis.isVisible()&&this.props.runInBackground!==!0)return;this.gl.useProgram(this.prog_diffuse);const s=this.cmt.mousePos;if(s){this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.controlTexture);const t=this.drawSelect.current.selectedIndex===0?10:2,r=t*2,m=new Uint32Array(r*r);for(let x=0;x<m.length;x++)m[x]=this.drawSelect.current.selectedIndex;const v=b(s.current.x-t,0,this.props.size-r),_=b(this.props.size-s.current.y-t,0,this.props.size-r);f(this.gl,Math.floor(v),Math.floor(_),r,r,m)}if(this.needsReset){this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textures[(this.frameCount+1)%2]),E(this.gl,0,0,this.props.size,this.props.size,new Float32Array(this.props.size*this.props.size)),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.controlTexture);const t=new Uint32Array(this.props.size*this.props.size);f(this.gl,0,0,this.props.size,this.props.size,t),this.needsReset=!1}this.gl.activeTexture(this.gl.TEXTURE0);for(let t=0;t<this.simSpeedRange.current.valueAsNumber;t++){const r=this.framebuffers[this.frameCount%2],m=this.textures[(this.frameCount+1)%2];this.gl.bindTexture(this.gl.TEXTURE_2D,m),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.frameCount++}this.gl.useProgram(this.prog_render),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float"),this.vao=this.gl.createVertexArray(),this.gl.bindVertexArray(this.vao);const i=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);for(let s=0;s<2;s++){const t=L(this.gl,this.props.size,this.props.size,new Float32Array(this.props.size*this.props.size));this.gl.bindTexture(this.gl.TEXTURE_2D,t),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.textures.push(t);const r=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,r),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,t,0),this.framebuffers.push(r)}{this.prog_diffuse=g(this.gl,[u(this.gl,this.gl.VERTEX_SHADER,w),u(this.gl,this.gl.FRAGMENT_SHADER,I)]);const s=this.gl.getAttribLocation(this.prog_diffuse,"c_position"),t=this.gl.getUniformLocation(this.prog_diffuse,"u_tex"),r=this.gl.getUniformLocation(this.prog_diffuse,"u_ctrl_tex");this.gl.enableVertexAttribArray(s),this.gl.vertexAttribPointer(s,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_diffuse),this.gl.uniform1i(t,0),this.controlTexture=G(this.gl,this.props.size,this.props.size),this.gl.uniform1i(r,1)}{this.prog_render=g(this.gl,[u(this.gl,this.gl.VERTEX_SHADER,w),u(this.gl,this.gl.FRAGMENT_SHADER,q)]);const s=this.gl.getAttribLocation(this.prog_render,"c_position"),t=this.gl.getUniformLocation(this.prog_render,"u_tex");this.gl.enableVertexAttribArray(s),this.gl.vertexAttribPointer(s,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(t,0)}this.cmt=new W(this.canvas.current),this.vis=new R(this.canvas.current),this.animationLoop()}componentWillUnmount(){this.cmt.cleanup(),this.vis.cleanup(),window.cancelAnimationFrame(this.requestID)}render(){return e.jsx("div",{style:this.props.style,className:this.props.className,children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-md-8 d-flex",children:e.jsxs("div",{children:[e.jsxs("div",{className:"text-center pb-3",hidden:!this.props.showInstructions,children:[e.jsx(D,{className:"fs-3",style:{transform:"translateY(0.5rem)"}}),e.jsx("span",{className:"fs-5",style:{fontFamily:"Permanent Marker"},children:" Click to Draw!"})]}),e.jsx("canvas",{className:"border border-dark w-100 mb-3",ref:this.canvas,height:this.props.size,width:this.props.size})]})}),e.jsx("div",{className:"col-md-4",children:e.jsxs("div",{className:"border border-dark p-3",children:[e.jsx("h6",{children:"Controls"}),e.jsxs("div",{className:"form-group mb-3",children:[e.jsx("label",{className:"form-label",children:"Simulation Speed"}),e.jsx("input",{type:"range",className:"form-range",min:"0",max:"100",step:1,defaultValue:1,ref:this.simSpeedRange})]}),e.jsx("div",{className:"form-group mb-3",children:e.jsxs("select",{className:"form-select",defaultValue:2,ref:this.drawSelect,children:[e.jsx("option",{value:0,children:"Erase"}),e.jsx("option",{value:1,children:"Draw Cold"}),e.jsx("option",{value:2,children:"Draw Hot"})]})}),e.jsx("div",{className:"form-group",children:e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsReset=!0,children:"Reset"})})]})})]})})}}const H="/assets/WebGL2SetupDemo_tsx-Czfov2Xz.txt",z="/assets/WebGL2HeatEqnDemo_tsx-C13tDNKA.txt",B="/assets/WebGL2HeatEqnDemo_BufferVars_tsx-Cxq_j9iN.txt",X="/assets/WebGL2HeatEqnDemo_BufferSetup_tsx-DGaD7fyO.txt",O="/assets/WebGL2HeatEqnDemo_Simulate_tsx-T7z1QsKR.txt",V="/assets/WebGL2HeatEqnDemo_FragmentShader_tsx-C2L5jcYS.txt",M="/assets/WebGL2HeatEqnDemo_RenderFragmentShader_tsx-2eF9nG9x.txt",Y="/assets/WebGL2HeatEqnDemo_ControlTexture_tsx-DU_siDGm.txt",J="/assets/WebGL2HeatEqnDemo_ControlEdit_tsx-DYO-HQ2t.txt",K="/assets/texturecoords-CD7dV6O-.png",Q="/assets/pingpong-C78Zt3uw.png";function o(l){return e.jsxs(p,{promise:T(l.url),children:[e.jsx(p.Pending,{children:e.jsx("div",{className:"spinner-border",role:"status"})}),e.jsx(p.Fulfilled,{children:i=>e.jsx(U,{className:"mx-5 mb-5",language:l.lang,showLineNumbers:!0,style:k,children:i})}),e.jsx(p.Rejected,{children:e.jsx("div",{className:"spinner-border",role:"status"})})]})}const $=()=>e.jsx(A,{children:({Citation:l,CitationBank:i})=>e.jsxs(e.Fragment,{children:[e.jsxs(h,{id:"overview",name:"Overview",children:[e.jsx("p",{children:"Our goals are to:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"provide a brief introduction to WebGL and its uses"}),e.jsx("li",{children:"demonstrate how to setup a simple WebGL program"}),e.jsx("li",{children:"demonstrate how use WebGL to accelerate computations"}),e.jsx("li",{children:"provide working code to simulate 2D heat transfer"})]}),e.jsx("h4",{className:"mt-5 mb-3",children:"A Sneak Preview of What We're Building Towards..."}),e.jsx(a,{title:"",children:e.jsx(j,{className:"mx-auto",style:{maxWidth:"40em"},size:400,showInstructions:!0})})]}),e.jsxs(h,{id:"webgl-intro",name:"WebGL Intro",children:[e.jsx("h4",{children:"What is WebGL2?"}),e.jsxs("p",{children:["WebGL is a GPU accelerated graphics API for the web. It's more or less based on OpenGL, so if you're familiar with that, you should find it pretty similar. For now, it's the only way to interface with the GPU on the web. Sometime in the relatively near future we'll hopefully be seeing ",e.jsx("a",{href:"https://webgpu.rocks/",children:"WebGPU"})," as well."]}),e.jsx("p",{children:"WebGL2 is the newer version of WebGL. The original WebGL was based on OpenGL ES 2.0, but WebGL2 is based on OpenGL ES 3.0. WebGL2 adds a ton of new features, and it's now supported by nearly all modern devices, so there's really no reason not to use it."}),e.jsx("p",{children:"In this article, we'll be assuming at least a passing familiarity with WebGL. You should be familiar with:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"how the graphics pipeline works"}),e.jsx("li",{children:"what vertex shaders do"}),e.jsx("li",{children:"what fragment shaders do"}),e.jsx("li",{children:"what a uniform is"})]}),e.jsx("p",{children:"If you need a refresher, the following articles are a pretty good source:"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(c,{href:"https://webgl2fundamentals.org/webgl/lessons/webgl-fundamentals.html"})}),e.jsx("li",{children:e.jsx(c,{href:"https://webgl2fundamentals.org/webgl/lessons/webgl-how-it-works.html"})})]}),e.jsx("p",{children:"And here's a link to a WebGL API reference."}),e.jsx("ul",{children:e.jsx("li",{children:e.jsx(c,{href:"https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API"})})})]}),e.jsxs(h,{id:"webgl2-setup",name:"Working with WebGL2",children:[e.jsx("h4",{children:"Why GPU?"}),e.jsxs("p",{children:["Fluid simulations can be parallelized, which means that the work can be split up into chunks that run independently. Your CPU (if you're running on a reasonably normal computer) probably has 4-32 threads. So, we could theoretically speed up the simulation 32x by taking advantage of multi-threading (although in practice it might not be so high). However, your GPU has the capability to run far more threads simultaneously. Depending on exactly which card you have, you can have a couple thousand threads concurrently running.",e.jsx(l,{source:"https://stackoverflow.com/questions/6490572/cuda-how-many-concurrent-threads-in-total"}),"."]}),e.jsx("p",{children:"There are downsides to running on the GPU however. First of all, the GPU is limited in what it can do. Secondly, GPU code is deployed in a batch manner, where the same code is given to all cores of the GPU. And finally, you can't use system calls in GPU code. So things like reading from a file or making a network request are not allowed."}),e.jsx("p",{children:"Although there are caveats, the GPU is still the best choice for simple fluid simulations like this one. So, let's get started."}),e.jsx("h4",{children:"WebGL Setup"}),e.jsx("p",{children:"WebGL2 was primary designed as a graphics api, and not really so much as a general purpose GPU compute API. As such, we will have to make use of a few workarounds in order to be able to do what we want."}),e.jsx("p",{children:"Let's first look at setting up a canvas:"}),e.jsxs(a,{title:"Canvas Setup",id:"canvas-setup-demo",children:[e.jsx("p",{children:"Code:"}),e.jsx(o,{lang:"tsx",url:H}),e.jsx("p",{children:"Result:"}),e.jsx(P,{className:"mx-auto mb-5",style:{display:"block"},size:400})]}),e.jsx("p",{children:"The code is mostly boilerplate associated with setting up WebGL. It draws two triangles, forming a suqare covering the entire clip space. If any of it is confusing, I reccomend reading some of the WebGL resources linked above."})]}),e.jsxs(h,{id:"webgl2-heat",name:"Heat Equation with WebGL2",children:[e.jsx("p",{children:"Now, we'll approach the heat equation, since it's a good starting point for dealing with interactive simulations."}),e.jsx("p",{children:"Here's the scenario: Imagine you have a uniform square metal plate. You're able to focus a hot blowtorch on some parts of the plate, and chill other parts with liquid nitrogen. What is the temperature of a given point on the plate?"}),e.jsxs("p",{children:["It turns out that it's pretty easy to simulate. We'll split our metal plate into a ",e.jsx(d,{math:"N"})," by ",e.jsx(d,{math:"N"})," square grid. Newton's law of cooling states that the rate of heat transfer is proportional to the difference in temperature. What this means is that in each timestep, for each cell, we set it to the average temperatures of its neighboring cells in the previous timestep."]}),e.jsxs("p",{children:["If you want to know why this works, you can check out this link: ",e.jsx(c,{href:"https://mattferraro.dev/posts/poissons-equation"}),"."]}),e.jsx("h4",{children:"External Code"}),e.jsx("p",{children:"In the interest of not drowning in the boilerplate, some of the code has been factored out into two seperate JS files:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("a",{href:"https://github.com/pimpale/pimpale.github.io/blob/master/src/utils/webgl.ts",children:"webgl.ts"}),": manage creating webgl textures and programs"]}),e.jsxs("li",{children:[e.jsx("a",{href:"https://github.com/pimpale/pimpale.github.io/blob/master/src/utils/canvas.ts",children:"canvas.ts"}),": manages tracking the position of the mouse on the cursor when mouse is clicked"]})]}),e.jsx("h4",{children:"Implementation"}),e.jsx("p",{children:"To implement it, we'll have to make several changes to our old boilerplate code."}),e.jsxs("ul",{children:[e.jsx("li",{children:"Adding a mutable heat buffer on the GPU."}),e.jsx("li",{children:"Adding a control buffer on the GPU that determines which cells are pinned."}),e.jsx("li",{children:"Adding a program that computes the next state of the heat."}),e.jsx("li",{children:"Adding a way to render the heat data."}),e.jsx("li",{children:"Adding a way to edit the control buffer."})]}),e.jsx("h5",{children:"Adding a mutable heat buffer on the GPU."}),e.jsx("p",{children:"Adding mutable data on the GPU is quite tricky. Since WebGL was primarily defined as a graphics rendering API, not a general purpose compute system, we'll have to abuse some rendering features to get what we want."}),e.jsx("p",{children:"The basic plan is to store our heat data in a texture. Since textures are more or less 2D arrays, this works great for our purposes. However, WebGL doesn't let us mutate a texture during shader execution."}),e.jsxs("p",{children:["So, in order to simulate one timestep we can render a ",e.jsx(d,{math:"N"})," by ",e.jsx(d,{math:"N"})," image, which will run a fragment shader for each pixel in the output. In the fragment shader, we'll do the work of computing the average of the neighboring pixels. We can take the output of that rendering, and stick it into a framebuffer."]}),e.jsx("p",{children:"In the next timestep, we'll swap buffers. We'll use the data we just rendered into the framebuffer as the source data. We'll render to the framebuffer linked to the place we stored our original heat data in the first frame."}),e.jsx("p",{children:`In this way, we'll "ping-pong" between the two textures.`}),e.jsxs("figure",{className:"col text-center",children:[e.jsx("img",{alt:"WebGL texture coordinate system",className:"d-block mx-auto",style:{width:"30em"},src:Q}),e.jsx("figcaption",{children:"Source: Own Work"}),e.jsx("p",{children:"Ping Ponging between Textures"})]}),e.jsxs(a,{title:"HeatEqn Texture/Framebuffer Setup",children:[e.jsx("p",{children:"Defining Texture/Framebuffer pair:"}),e.jsx(o,{lang:"tsx",url:B}),e.jsx("p",{children:"Initializing Texture/Framebuffer pair:"}),e.jsx(o,{lang:"tsx",url:X}),e.jsx("p",{children:"Running the simulation:"}),e.jsx(o,{lang:"tsx",url:O})]}),e.jsx("h5",{children:"Adding a control buffer on the GPU"}),e.jsx("p",{children:"Now that we know how to add one texture to the GPU, it's quite easy to add another."}),e.jsx("p",{children:"We're going to be editing the control buffer solely from the CPU side. Therefore, since it doesn't need to be mutable from the shader, it's substantially easier to manage. No ping-ponging is necessary!"}),e.jsx(a,{title:"HeatEqn Control Texture Setup",children:e.jsx(o,{lang:"tsx",url:Y})}),e.jsx("h5",{children:"Adding a program that computes the next state of the heat"}),e.jsx("p",{children:"Now that we've set up our control texture and our two temperature framebuffer-texture pairs, we can write the code to read from one and write to the other."}),e.jsx("p",{children:"The vertex shader can be reused as is from the WebGL setup code. All the actual work of simulation happens in the fragment shader."}),e.jsxs("p",{children:["What this shader does is conceptually pretty simple. It gets the heat data from the 4 adjacent points on the ",e.jsx("code",{children:"u_tex"})," texture (which represents the temperature at a given location at the previous timestep). It then averages them together to get the next temperature."]}),e.jsx("p",{children:"One tricky point is that we need to calculate how far away each neighboring pixel is. In WebGL, texture coordinates are measured from 0 to 1, regardless of the size of the original image. So, we need to get the texture's size in order to calculate how far away (in texture coordinates) a neighboring pixel is."}),e.jsxs("p",{children:["Also in this fragment, we add a texture called ",e.jsx("code",{children:"u_ctrl_tex"}),". Based on the value stored in this texture, we decide whether to normally calculate the that would be here in the next timestep, or whether to set to a fixed hot or cold temperature."]}),e.jsx(a,{title:"HeatEqn Heat Fragment Shader",children:e.jsx(o,{lang:"tsx",url:V})}),e.jsx("h5",{children:"Adding a way to render the heat data"}),e.jsx("p",{children:"We can write another fragment shader to handle rendering the heat data to the canvas."}),e.jsxs("p",{children:["In order to make it look good, we use the inferno colorscheme, using code from here: ",e.jsx(c,{href:"https://www.shadertoy.com/view/WlfXRN"}),"."]}),e.jsx(a,{title:"HeatEqn Render Fragment Shader",children:e.jsx(o,{lang:"tsx",url:M})}),e.jsx("h5",{children:"Adding a way to edit the control buffer"}),e.jsx("p",{children:"The final part of our program is adding a way to edit the control buffer. There isn't anything particularly interesting from a algorithmic standpoint here."}),e.jsxs("p",{children:["One common source of errors is that the coordinate system of WebGL has its origin on the bottom left, not the top left. So, the ",e.jsx(d,{math:"y"}),"-axis has the opposite orientation of HTML's ",e.jsx(d,{math:"y"}),"-axis."]}),e.jsxs("figure",{className:"col text-center",children:[e.jsx("img",{alt:"WebGL texture coordinate system",className:"d-block mx-auto",style:{width:"30em"},src:K}),e.jsx("figcaption",{children:"Source: Own Work"}),e.jsx("p",{children:"WebGL Texture Coordinate system"})]}),e.jsxs(a,{title:"HeatEqn Render Fragment Shader",children:[e.jsx("p",{children:"Added at the beginning of the animationLoop method:"}),e.jsx(o,{lang:"tsx",url:J})]}),e.jsx("h4",{children:"The Final Product"}),e.jsx("p",{children:"Now, let's bring it all together. The code for the entire operation is quite long, but you can click the dropdown to view it here in its full glory:"}),e.jsxs("details",{className:"mb-3 mx-5",children:[e.jsx("summary",{children:"Full Code (long!)"}),e.jsx(o,{lang:"tsx",url:z})]}),e.jsxs("p",{children:["It's also available on github here: ",e.jsx(c,{href:"https://github.com/pimpale/pimpale.github.io/blob/master/src/components/WebGL2HeatEqnDemo.tsx"})]}),e.jsxs(a,{title:"Heat Equation",id:"heat-equation-demo",children:[e.jsx("p",{children:"Drag your mouse across the canvas to draw."}),e.jsx("p",{children:"Use the dropdown menu to select whether to draw with hot, cold, or switch to eraser mode."}),e.jsx("p",{children:"Use button to reset canvas to default."}),e.jsx(j,{className:"mx-auto",style:{maxWidth:"40em"},size:400,showInstructions:!0})]})]}),e.jsxs(h,{id:"conclusion",name:"Conclusion",children:[e.jsx("h4",{children:"Summary"}),e.jsx("p",{children:"It's somewhat more difficult to use WebGL2 to simulate than using plain JS, but it's a lot faster, especially for very parallelizable problems."}),e.jsx("p",{children:"We learned how to setup a WebGL to simulate and render a simple numerical simulation calculating heat transfer."}),e.jsx("h4",{children:"Next Time"}),e.jsx("p",{children:"In the next article, we'll:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"explain simply the math behind fluid simulation"}),e.jsx("li",{children:"learn how to use the Navier-Stokes equations to simulate fluids"}),e.jsx("li",{children:"provide working code to simulate 2D incompressible flow"})]}),e.jsx("p",{children:"Link:"}),e.jsx("ul",{children:e.jsx("li",{children:e.jsx(S,{a:C.get("fluid2")})})})]}),e.jsx(h,{id:"sources",name:"Sources",children:e.jsx(i,{})})]})}),Z=y.createRoot(document.getElementById("root"));Z.render(e.jsx(n.StrictMode,{children:e.jsx($,{})}));
