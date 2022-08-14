import"./modulepreload-polyfill.c7c6310f.js";import{a as l,j as e,b as t,F as T}from"./bootstrap.7d10a938.js";import{A}from"./ArticleLayout.ecb53228.js";import{S as c}from"./Section.8e815bfd.js";import{H as d}from"./HrefLink.8f8cf9cb.js";import{A as g,f as E}from"./load.c2d81c3b.js";import{i as u}from"./react-katex.m.8f71ecb7.js";import{A as n}from"./AsideCard.1b9c35e1.js";import{d as b,e as p,g as x,o as L,c as G,h as R}from"./webgl.f33c1914.js";import{c as w}from"./math.e4175633.js";import{C as W}from"./canvas.b4c9bbaa.js";import{a as S,b as U}from"./Articles.5c1d8dba.js";import{c as D}from"./client.51c5931a.js";import{S as C,a as F}from"./a11y-dark.a715064a.js";const k=`#version 300 es
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
`,P=`#version 300 es
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
`;class N extends l.Component{constructor(s){super(s),this.canvas=l.createRef(),this.animationLoop=()=>{this.requestID=window.requestAnimationFrame(this.animationLoop),this.gl.useProgram(this.program),this.gl.bindVertexArray(this.vao),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2"),this.program=b(this.gl,[p(this.gl,this.gl.VERTEX_SHADER,k),p(this.gl,this.gl.FRAGMENT_SHADER,P)]);const s=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,s),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);const i=this.gl.getAttribLocation(this.program,"a_position");this.vao=this.gl.createVertexArray(),this.gl.bindVertexArray(this.vao),this.gl.enableVertexAttribArray(i),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.animationLoop()}componentWillUnmount(){window.cancelAnimationFrame(this.requestID)}render(){return e("canvas",{style:this.props.style,className:this.props.className,ref:this.canvas,height:this.props.size,width:this.props.size})}}const v=`#version 300 es
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
`;class H extends l.Component{constructor(s){super(s),this.canvas=l.createRef(),this.simSpeedRange=l.createRef(),this.drawSelect=l.createRef(),this.textures=[],this.framebuffers=[],this.frameCount=0,this.needsReset=!1,this.animationLoop=()=>{this.requestID=window.requestAnimationFrame(this.animationLoop),this.gl.useProgram(this.prog_diffuse);const i=this.cmt.mousePos;if(i){this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.controlTexture);const r=this.drawSelect.current.selectedIndex===0?10:2,o=r*2,m=new Uint32Array(o*o);for(let f=0;f<m.length;f++)m[f]=this.drawSelect.current.selectedIndex;const _=w(i.current.x-r,0,this.props.size-o),y=w(this.props.size-i.current.y-r,0,this.props.size-o);x(this.gl,Math.floor(_),Math.floor(y),o,o,m)}if(this.needsReset){this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textures[(this.frameCount+1)%2]),L(this.gl,0,0,this.props.size,this.props.size,new Float32Array(this.props.size*this.props.size)),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.controlTexture);const r=new Uint32Array(this.props.size*this.props.size);x(this.gl,0,0,this.props.size,this.props.size,r),this.needsReset=!1}this.gl.activeTexture(this.gl.TEXTURE0);for(let r=0;r<this.simSpeedRange.current.valueAsNumber;r++){const o=this.framebuffers[this.frameCount%2],m=this.textures[(this.frameCount+1)%2];this.gl.bindTexture(this.gl.TEXTURE_2D,m),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,o),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.frameCount++}this.gl.useProgram(this.prog_render),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext("webgl2"),this.gl.getExtension("EXT_color_buffer_float"),this.vao=this.gl.createVertexArray(),this.gl.bindVertexArray(this.vao);const s=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,s),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);for(let i=0;i<2;i++){const r=G(this.gl,this.props.size,this.props.size,new Float32Array(this.props.size*this.props.size));this.gl.bindTexture(this.gl.TEXTURE_2D,r),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.textures.push(r);const o=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,o),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,r,0),this.framebuffers.push(o)}{this.prog_diffuse=b(this.gl,[p(this.gl,this.gl.VERTEX_SHADER,v),p(this.gl,this.gl.FRAGMENT_SHADER,I)]);const i=this.gl.getAttribLocation(this.prog_diffuse,"c_position"),r=this.gl.getUniformLocation(this.prog_diffuse,"u_tex"),o=this.gl.getUniformLocation(this.prog_diffuse,"u_ctrl_tex");this.gl.enableVertexAttribArray(i),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_diffuse),this.gl.uniform1i(r,0),this.controlTexture=R(this.gl,this.props.size,this.props.size),this.gl.uniform1i(o,1)}{this.prog_render=b(this.gl,[p(this.gl,this.gl.VERTEX_SHADER,v),p(this.gl,this.gl.FRAGMENT_SHADER,q)]);const i=this.gl.getAttribLocation(this.prog_render,"c_position"),r=this.gl.getUniformLocation(this.prog_render,"u_tex");this.gl.enableVertexAttribArray(i),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(r,0)}this.cmt=new W(this.canvas.current),this.animationLoop()}componentWillUnmount(){this.cmt.cleanup(),window.cancelAnimationFrame(this.requestID)}render(){return e("div",{style:this.props.style,className:this.props.className,children:t("div",{className:"row",children:[e("div",{className:"col-md-8 d-flex",children:e("canvas",{className:"border border-dark",ref:this.canvas,height:this.props.size,width:this.props.size})}),e("div",{className:"col-md-4",children:t("div",{className:"border border-dark p-3 m-3",children:[e("h6",{children:"Controls"}),t("div",{className:"form-group mb-3",children:[e("label",{className:"form-label",children:"Simulation Speed"}),e("input",{type:"range",className:"form-range",min:"0",max:"100",step:1,defaultValue:1,ref:this.simSpeedRange})]}),e("div",{className:"form-group mb-3",children:t("select",{className:"form-select",defaultValue:2,ref:this.drawSelect,children:[e("option",{value:0,children:"Erase"}),e("option",{value:1,children:"Draw Cold"}),e("option",{value:2,children:"Draw Hot"})]})}),e("div",{className:"form-group",children:e("button",{className:"btn btn-primary btn-sm",onClick:()=>this.needsReset=!0,children:"Reset"})})]})})]})})}}const z="/assets/WebGL2SetupDemo_tsx.78371353.txt",B="/assets/WebGL2HeatEqnDemo_tsx.c1773845.txt",X="/assets/WebGL2HeatEqnDemo_BufferVars_tsx.57b33deb.txt",M="/assets/WebGL2HeatEqnDemo_BufferSetup_tsx.fbcbc109.txt",O="/assets/WebGL2HeatEqnDemo_Simulate_tsx.64825d15.txt",V="/assets/WebGL2HeatEqnDemo_FragmentShader_tsx.4c300f63.txt",j="/assets/WebGL2HeatEqnDemo_RenderFragmentShader_tsx.3ab13bf1.txt",Y="/assets/WebGL2HeatEqnDemo_ControlTexture_tsx.31f4698c.txt",J="/assets/WebGL2HeatEqnDemo_ControlEdit_tsx.1b8ec586.txt",$="/assets/texturecoords.2631ce25.png",K="/assets/pingpong.3d87936a.png";function a(h){return t(g,{promise:E(h.url),children:[e(g.Pending,{children:e("div",{className:"spinner-border",role:"status"})}),e(g.Fulfilled,{children:s=>e(C,{className:"mx-5 mb-5",language:h.lang,showLineNumbers:!0,style:F,children:s})}),e(g.Rejected,{children:e("div",{className:"spinner-border",role:"status"})})]})}const Q=()=>e(A,{children:({Citation:h,CitationBank:s})=>t(T,{children:[t(c,{id:"overview",name:"Overview",children:[e("p",{children:"Our goals are to:"}),t("ul",{children:[e("li",{children:"provide a brief introduction to WebGL and its uses"}),e("li",{children:"demonstrate how to setup a simple WebGL program"}),e("li",{children:"demonstrate how use WebGL to accelerate computations"}),e("li",{children:"provide working code to simulate 2D heat transfer"})]})]}),t(c,{id:"webgl-intro",name:"WebGL Intro",children:[e("h4",{children:"What is WebGL2?"}),t("p",{children:["WebGL is a GPU accelerated graphics API for the web. It's more or less based on OpenGL, so if you're familiar with that, you should find it pretty similar. For now, it's the only way to interface with the GPU on the web. Sometime in the relatively near future we'll hopefully be seeing ",e("a",{href:"https://webgpu.rocks/",children:"WebGPU"})," as well."]}),e("p",{children:"WebGL2 is the newer version of WebGL. The original WebGL was based on OpenGL ES 2.0, but WebGL2 is based on OpenGL ES 3.0. WebGL2 adds a ton of new features, and it's now supported by nearly all modern devices, so there's really no reason not to use it."}),e("p",{children:"In this article, we'll be assuming at least a passing familiarity with WebGL. You should be familiar with:"}),t("ul",{children:[e("li",{children:"how the graphics pipeline works"}),e("li",{children:"what vertex shaders do"}),e("li",{children:"what fragment shaders do"}),e("li",{children:"what a uniform is"})]}),e("p",{children:"If you need a refresher, the following articles are a pretty good source:"}),t("ul",{children:[e("li",{children:e(d,{href:"https://webgl2fundamentals.org/webgl/lessons/webgl-fundamentals.html"})}),e("li",{children:e(d,{href:"https://webgl2fundamentals.org/webgl/lessons/webgl-how-it-works.html"})})]}),e("p",{children:"And here's a link to a WebGL API reference."}),e("ul",{children:e("li",{children:e(d,{href:"https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API"})})})]}),t(c,{id:"webgl2-setup",name:"Working with WebGL2",children:[e("h4",{children:"Why GPU?"}),t("p",{children:["Fluid simulations can be parallelized, which means that the work can be split up into chunks that run independently. Your CPU (if you're running on a reasonably normal computer) probably has 4-32 threads. So, we could theoretically speed up the simulation 32x by taking advantage of multi-threading (although in practice it might not be so high). However, your GPU has the capability to run far more threads simultaneously. Depending on exactly which card you have, you can have a couple thousand threads concurrently running.",e(h,{source:"https://stackoverflow.com/questions/6490572/cuda-how-many-concurrent-threads-in-total"}),"."]}),e("p",{children:"There are downsides to running on the GPU however. First of all, the GPU is limited in what it can do. Secondly, GPU code is deployed in a batch manner, where the same code is given to all cores of the GPU. And finally, you can't use system calls in GPU code. So things like reading from a file or making a network request are not allowed."}),e("p",{children:"Although there are caveats, the GPU is still the best choice for simple fluid simulations like this one. So, let's get started."}),e("h4",{children:"WebGL Setup"}),e("p",{children:"WebGL2 was primary designed as a graphics api, and not really so much as a general purpose GPU compute API. As such, we will have to make use of a few workarounds in order to be able to do what we want."}),e("p",{children:"Let's first look at setting up a canvas:"}),t(n,{title:"Canvas Setup",id:"canvas-setup-demo",children:[e("p",{children:"Code:"}),e(a,{lang:"tsx",url:z}),e("p",{children:"Result:"}),e(N,{className:"mx-auto mb-5",style:{display:"block"},size:400})]}),e("p",{children:"The code is mostly boilerplate associated with setting up WebGL. It draws two triangles, forming a suqare covering the entire clip space. If any of it is confusing, I reccomend reading some of the WebGL resources linked above."})]}),t(c,{id:"webgl2-heat",name:"Heat Equation with WebGL2",children:[e("p",{children:"Now, we'll approach the heat equation, since it's a good starting point for dealing with interactive simulations."}),e("p",{children:"Here's the scenario: Imagine you have a uniform square metal plate. You're able to focus a hot blowtorch on some parts of the plate, and chill other parts with liquid nitrogen. What is the temperature of a given point on the plate?"}),t("p",{children:["It turns out that it's pretty easy to simulate. We'll split our metal plate into a ",e(u,{math:"N"})," by ",e(u,{math:"N"})," square grid. Newton's law of cooling states that the rate of heat transfer is proportional to the difference in temperature. What this means is that in each timestep, for each cell, we set it to the average temperatures of its neighboring cells in the previous timestep."]}),t("p",{children:["If you want to know why this works, you can check out this link: ",e(d,{href:"https://mattferraro.dev/posts/poissons-equation"}),"."]}),e("h4",{children:"External Code"}),e("p",{children:"In the interest of not drowning in the boilerplate, some of the code has been factored out into two seperate JS files:"}),t("ul",{children:[t("li",{children:[e("a",{href:"https://github.com/pimpale/pimpale.github.io/blob/master/src/utils/webgl.ts",children:"webgl.ts"}),": manage creating webgl textures and programs"]}),t("li",{children:[e("a",{href:"https://github.com/pimpale/pimpale.github.io/blob/master/src/utils/canvas.ts",children:"canvas.ts"}),": manages tracking the position of the mouse on the cursor when mouse is clicked"]})]}),e("h4",{children:"Implementation"}),e("p",{children:"To implement it, we'll have to make several changes to our old boilerplate code."}),t("ul",{children:[e("li",{children:"Adding a mutable heat buffer on the GPU."}),e("li",{children:"Adding a control buffer on the GPU that determines which cells are pinned."}),e("li",{children:"Adding a program that computes the next state of the heat."}),e("li",{children:"Adding a way to render the heat data."}),e("li",{children:"Adding a way to edit the control buffer."})]}),e("h5",{children:"Adding a mutable heat buffer on the GPU."}),e("p",{children:"Adding mutable data on the GPU is quite tricky. Since WebGL was primarily defined as a graphics rendering API, not a general purpose compute system, we'll have to abuse some rendering features to get what we want."}),e("p",{children:"The basic plan is to store our heat data in a texture. Since textures are more or less 2D arrays, this works great for our purposes. However, WebGL doesn't let us mutate a texture during shader execution."}),t("p",{children:["So, in order to simulate one timestep we can render a ",e(u,{math:"N"})," by ",e(u,{math:"N"})," image, which will run a fragment shader for each pixel in the output. In the fragment shader, we'll do the work of computing the average of the neighboring pixels. We can take the output of that rendering, and stick it into a framebuffer."]}),e("p",{children:"In the next timestep, we'll swap buffers. We'll use the data we just rendered into the framebuffer as the source data. We'll render to the framebuffer linked to the place we stored our original heat data in the first frame."}),e("p",{children:`In this way, we'll "ping-pong" between the two textures.`}),t("figure",{className:"col text-center",children:[e("img",{alt:"WebGL texture coordinate system",className:"d-block mx-auto",style:{width:"30em"},src:K}),e("figcaption",{children:"Source: Own Work"}),e("p",{children:"Ping Ponging between Textures"})]}),t(n,{title:"HeatEqn Texture/Framebuffer Setup",children:[e("p",{children:"Defining Texture/Framebuffer pair:"}),e(a,{lang:"tsx",url:X}),e("p",{children:"Initializing Texture/Framebuffer pair:"}),e(a,{lang:"tsx",url:M}),e("p",{children:"Running the simulation:"}),e(a,{lang:"tsx",url:O})]}),e("h5",{children:"Adding a control buffer on the GPU"}),e("p",{children:"Now that we know how to add one texture to the GPU, it's quite easy to add another."}),e("p",{children:"We're going to be editing the control buffer solely from the CPU side. Therefore, since it doesn't need to be mutable from the shader, it's substantially easier to manage. No ping-ponging is necessary!"}),e(n,{title:"HeatEqn Control Texture Setup",children:e(a,{lang:"tsx",url:Y})}),e("h5",{children:"Adding a program that computes the next state of the heat"}),e("p",{children:"Now that we've set up our control texture and our two temperature framebuffer-texture pairs, we can write the code to read from one and write to the other."}),e("p",{children:"The vertex shader can be reused as is from the WebGL setup code. All the actual work of simulation happens in the fragment shader."}),t("p",{children:["What this shader does is conceptually pretty simple. It gets the heat data from the 4 adjacent points on the ",e("code",{children:"u_tex"})," texture (which represents the temperature at a given location at the previous timestep). It then averages them together to get the next temperature."]}),e("p",{children:"One tricky point is that we need to calculate how far away each neighboring pixel is. In WebGL, texture coordinates are measured from 0 to 1, regardless of the size of the original image. So, we need to get the texture's size in order to calculate how far away (in texture coordinates) a neighboring pixel is."}),t("p",{children:["Also in this fragment, we add a texture called ",e("code",{children:"u_ctrl_tex"}),". Based on the value stored in this texture, we decide whether to normally calculate the that would be here in the next timestep, or whether to set to a fixed hot or cold temperature."]}),e(n,{title:"HeatEqn Heat Fragment Shader",children:e(a,{lang:"tsx",url:V})}),e("h5",{children:"Adding a way to render the heat data"}),e("p",{children:"We can write another fragment shader to handle rendering the heat data to the canvas."}),t("p",{children:["In order to make it look good, we use the inferno colorscheme, using code from here: ",e(d,{href:"https://www.shadertoy.com/view/WlfXRN"}),"."]}),e(n,{title:"HeatEqn Render Fragment Shader",children:e(a,{lang:"tsx",url:j})}),e("h5",{children:"Adding a way to edit the control buffer"}),e("p",{children:"The final part of our program is adding a way to edit the control buffer. There isn't anything particularly interesting from a algorithmic standpoint here."}),t("p",{children:["One common source of errors is that the coordinate system of WebGL has its origin on the bottom left, not the top left. So, the ",e(u,{math:"y"}),"-axis has the opposite orientation of HTML's ",e(u,{math:"y"}),"-axis."]}),t("figure",{className:"col text-center",children:[e("img",{alt:"WebGL texture coordinate system",className:"d-block mx-auto",style:{width:"30em"},src:$}),e("figcaption",{children:"Source: Own Work"}),e("p",{children:"WebGL Texture Coordinate system"})]}),t(n,{title:"HeatEqn Render Fragment Shader",children:[e("p",{children:"Added at the beginning of the animationLoop method:"}),e(a,{lang:"tsx",url:J})]}),e("h4",{children:"The Final Product"}),e("p",{children:"Now, let's bring it all together. The code for the entire operation is quite long, but you can click the dropdown to view it here in its full glory:"}),t("details",{className:"mb-3 mx-5",children:[e("summary",{children:"Full Code (long!)"}),e(a,{lang:"tsx",url:B})]}),t("p",{children:["It's also available on github here: ",e(d,{href:"https://github.com/pimpale/pimpale.github.io/blob/master/src/components/WebGL2HeatEqnDemo.tsx"})]}),t(n,{title:"Heat Equation",id:"heat-equation-demo",children:[e("p",{children:"Drag your mouse across the canvas to draw."}),e("p",{children:"Use the dropdown menu to select whether to draw with hot, cold, or switch to eraser mode."}),e("p",{children:"Use button to reset canvas to default."}),e(H,{className:"mx-auto",style:{maxWidth:"40em"},size:400})]})]}),t(c,{id:"conclusion",name:"Conclusion",children:[e("h4",{children:"Summary"}),e("p",{children:"It's somewhat more difficult to use WebGL2 to simulate than using plain JS, but it's a lot faster, especially for very parallelizable problems."}),e("p",{children:"We learned how to setup a WebGL to simulate and render a simple numerical simulation calculating heat transfer."}),e("h4",{children:"Next Time"}),e("p",{children:"In the next article, we'll:"}),t("ul",{children:[e("li",{children:"explain simply the math behind fluid simulation"}),e("li",{children:"learn how to use the Navier-Stokes equations to simulate fluids"}),e("li",{children:"provide working code to simulate 2D incompressible flow"})]}),e("p",{children:"Link:"}),e("ul",{children:e("li",{children:e(S,{a:U.get("fluid2")})})})]}),e(c,{id:"sources",name:"Sources",children:e(s,{})})]})}),Z=D(document.getElementById("root"));Z.render(e(l.StrictMode,{children:e(Q,{})}));
